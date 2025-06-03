import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Users, Brain } from 'lucide-react';

function Research() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Research & Publications
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Exploring the frontiers of emotion recognition technology through rigorous research and innovation.
          </motion.p>
        </div>

        {/* Research Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Brain,
              title: 'Deep Learning Models',
              description: 'Advanced neural networks for facial feature extraction and emotion classification.',
            },
            {
              icon: Users,
              title: 'Human-Computer Interaction',
              description: 'Studying how emotion recognition can enhance user experience and interaction.',
            },
            {
              icon: FileText,
              title: 'Ethical AI Development',
              description: 'Ensuring responsible development and deployment of emotion recognition systems.',
            },
            {
              icon: BookOpen,
              title: 'Cross-Cultural Studies',
              description: 'Understanding emotional expression across different cultures and contexts.',
            },
          ].map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <area.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
              <p className="text-gray-600">{area.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Latest Publications */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Latest Publications</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Advanced Facial Expression Recognition Using Deep Learning',
                authors: 'Smith, J., Johnson, M., et al.',
                journal: 'Journal of Artificial Intelligence',
                year: '2024',
              },
              {
                title: 'Cross-Cultural Validation of Emotion Recognition Systems',
                authors: 'Zhang, L., Patel, R., et al.',
                journal: 'International Journal of Human-Computer Studies',
                year: '2023',
              },
              {
                title: 'Privacy-Preserving Emotion Recognition: A New Approach',
                authors: 'Brown, K., Lee, S., et al.',
                journal: 'Privacy and Security Journal',
                year: '2023',
              },
            ].map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="border-l-4 border-indigo-600 pl-4"
              >
                <h3 className="text-lg font-semibold">{pub.title}</h3>
                <p className="text-gray-600">{pub.authors}</p>
                <p className="text-gray-500">
                  {pub.journal} • {pub.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Research Partners */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Research Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'University of Technology',
              'AI Research Institute',
              'Global Innovation Lab',
              'Tech Solutions Corp',
            ].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-gray-600 font-medium">{partner}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Research;