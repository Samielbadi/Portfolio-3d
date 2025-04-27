import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';
import { ArrowDown } from 'lucide-react';

const Model = () => {
  // This would normally load a 3D model
  // For this example, we'll create a placeholder sphere
  return (
    <mesh>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="#3E92CC" metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

// Abstract 3D elements for the background
const HeroBackground = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef}>
      {/* Create 20 random cubes for background */}
      {Array.from({ length: 20 }).map((_, i) => {
        const position = [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 5 - 5
        ];
        const rotation = [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          0
        ];
        const size = 0.2 + Math.random() * 0.3;
        
        return (
          <mesh key={i} position={position as any} rotation={rotation as any}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#3E92CC" : "#0A2463"} 
              transparent
              opacity={0.6 + Math.random() * 0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} />
          <HeroBackground />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <motion.h2 
              className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-medium mb-2"
              variants={itemVariants}
            >
              Hello, I'm
            </motion.h2>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-4"
              variants={itemVariants}
            >
              Sami El badi
            </motion.h1>
            <motion.h3 
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6"
              variants={itemVariants}
            >
              Creative Programmer
            </motion.h3>
            <motion.p 
              className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl"
              variants={itemVariants}
            >
              I build exceptional digital experiences that combine creativity with technical expertise. Specializing in interactive web applications and 3D visualizations.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Get in touch
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 px-6 py-3 rounded-md font-medium transition-all"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                See my work
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2 h-64 sm:h-80 md:h-96"
            variants={itemVariants}
          >
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <Model />
              <OrbitControls enableZoom={false} />
              <Environment preset="city" />
            </Canvas>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToAbout}
        whileHover={{ y: 5 }}
      >
        <ArrowDown size={24} className="text-blue-600 dark:text-blue-400 animate-bounce" />
      </motion.div>
    </section>
  );
};