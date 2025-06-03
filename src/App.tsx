import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthGuard } from './components/AuthGuard';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import About from './pages/About';
import Research from './pages/Research';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  const setUser = useAuthStore((state) => state.user);

  // useEffect(() => {
  //     setUser(user);

  // });

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <AuthGuard>
                    <Home />
                  </AuthGuard>
                }
              />
              <Route
                path="/analyzer"
                element={
                  <AuthGuard>
                    <Analyzer />
                  </AuthGuard>
                }
              />
              <Route
                path="/about"
                element={
                  <AuthGuard>
                    <About />
                  </AuthGuard>
                }
              />
              <Route
                path="/research"
                element={
                  <AuthGuard>
                    <Research />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;