import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BookOpen } from 'lucide-react';

function About() {
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
            About EmotionAI
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We're dedicated to advancing the field of emotion recognition through cutting-edge artificial intelligence.
          </motion.p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            EmotionAI aims to bridge the gap between human emotions and technology. We believe that by better understanding
            human expressions and emotions, we can create more empathetic and responsive systems that enhance human-computer
            interaction and improve people's lives.
          </p>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Users,
              title: 'Expert Team',
              description: 'Our team comprises leading experts in AI, psychology, and human-computer interaction.',
            },
            {
              icon: Award,
              title: 'Recognition',
              description: 'Award-winning research and development in facial expression recognition technology.',
            },
            {
              icon: BookOpen,
              title: 'Research',
              description: 'Continuous innovation through academic partnerships and industry collaboration.',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <item.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Privacy First',
                description: 'We prioritize user privacy and data security in everything we do.',
              },
              {
                title: 'Ethical AI',
                description: 'Our AI systems are developed with strong ethical principles and fairness in mind.',
              },
              {
                title: 'Innovation',
                description: "We constantly push the boundaries of what is possible in emotion recognition.",
              },
              {
                title: 'Accessibility',
                description: 'Making advanced technology accessible to everyone through user-friendly interfaces.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="border-l-4 border-indigo-600 pl-4"
              >
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;