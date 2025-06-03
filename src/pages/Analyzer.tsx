import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, RefreshCw, AlertCircle, X } from 'lucide-react';

interface EmotionResult {
  emotion: string;
  confidence: number;
}

function Analyzer() {
  const emotion = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral'];
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Cleanup camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
          formData.append('file', file);

          fetch('https://sdpproject-server.onrender.com/api/auth/predict', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const res: EmotionResult = {
                      emotion: data.error === 'No face detected' ? 'No Face' : emotion[data.emotion],
                      confidence: 0.8
                    }
                    setResult(res)
                    // emotionDisplay.innerText = emotionMap[data.emotion] || data.error;
                    // emotionDisplay.style.display = 'block';
                })
                .catch(error => console.error('Error:', error));
    }
  };

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play(); // Ensure video starts playing
        setStream(mediaStream);
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Could not access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setError(null);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob(blob => {
          const formData = new FormData();
          const nameFile = Date.now();
          formData.append('file', blob, nameFile+'.jpg');

          fetch('http://localhost:5000/api/auth/predict', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const res: EmotionResult = {
                      emotion: data.error === 'No face detected' ? 'No Face' : emotion[data.emotion],
                      confidence: 0.8
                    }
                    setResult(res)
                    // emotionDisplay.innerText = emotionMap[data.emotion] || data.error;
                    // emotionDisplay.style.display = 'block';
                })
                .catch(error => console.error('Error:', error));
        }, 'image/jpeg')
        // const photoUrl = canvas.toDataURL('image/jpeg', 0.8);
        // setImage(photoUrl);
        stopCamera();
        // processImage(photoUrl);
      }
    }
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Simulated processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockResult: EmotionResult = {
        emotion: ['Happy', 'Sad', 'Excited', 'Confused', 'Frustrated'][Math.floor(Math.random() * 5)],
        confidence: Math.random() * 0.3 + 0.7
      };
      setResult(mockResult);
    } catch (err) {
      console.error('Processing error:', err);
      setError('Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    stopCamera();
    setImage(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            Facial Expression Recognition
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Upload an image or take a photo to analyze facial expressions and emotions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
                    isCameraActive ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  disabled={isCameraActive}
                >
                  <Upload size={20} />
                  Upload Image
                </button>
                {isCameraActive ? (
                  <div className="flex gap-2">
                    <button
                      onClick={capturePhoto}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Camera size={20} />
                      Capture
                    </button>
                    <button
                      onClick={stopCamera}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X size={20} />
                      Stop Camera
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={startCamera}
                    className={`flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg transition-colors ${
                      image ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                    }`}
                    disabled={!!image}
                  >
                    <Camera size={20} />
                    Open Camera
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative"
              >
                {isCameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image selected
                  </div>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <RefreshCw className="animate-spin" />
                  <span>Processing image...</span>
                </div>
              ) : error ? (
                <div className="flex items-center text-red-600 space-x-2">
                  <AlertCircle />
                  <span>{error}</span>
                </div>
              ) : result ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-2">Detected Emotion</h3>
                    <p className="text-2xl font-bold text-indigo-600">
                      {result.emotion}
                    </p>
                    <div className="mt-2">
                      <div className="text-sm text-gray-600">Confidence</div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence * 100}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="bg-indigo-600 h-2.5 rounded-full"
                        />
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {Math.round(result.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <p className="text-gray-500 text-center">
                  Upload an image or take a photo to see the results
                </p>
              )}

              {(image || result || error || isCameraActive) && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={resetAll}
                  className="mt-4 w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Start Over
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Analyzer;