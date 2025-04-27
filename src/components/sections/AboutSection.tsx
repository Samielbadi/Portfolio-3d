import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '../../contexts/ThemeContext';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLeft?: boolean;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, isLeft = true, index }) => {
  const itemRef = useRef(null);
  
  const variants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2 
      } 
    }
  };
  
  return (
    <motion.div
      ref={itemRef}
      className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
    >
      <div className={`relative w-full md:w-2/5 p-6 ${
        isLeft ? 'md:mr-auto' : 'md:ml-auto'
      } bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-blue-100 dark:border-blue-900`}>
        <div className="absolute top-6 h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400 transform translate-y-0 
          ${isLeft ? '-right-8 -translate-x-1/2 md:right-0 md:translate-x-1/2' : '-left-8 translate-x-1/2 md:left-0 md:-translate-x-1/2'} z-10" />
        
        <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded mb-2">
          {year}
        </span>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </motion.div>
  );
};

// 3D interactive timeline component for decoration
const TimelineDecoration = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh ref={meshRef} position={[0, 0, -2]} rotation={[0, 0, Math.PI / 4]}>
      <torusGeometry args={[5, 0.2, 16, 100]} />
      <meshStandardMaterial color="#3E92CC" metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  const timelineItems = [
    {
      year: "2015",
      title: "Bachelor's Degree in Computer Science",
      description: "Graduated with honors from University of Technology"
    },
    {
      year: "2017",
      title: "Frontend Developer at TechStart Inc.",
      description: "Worked on interactive web applications and user interfaces"
    },
    {
      year: "2019",
      title: "Senior Developer at Creative Solutions",
      description: "Led development of award-winning interactive experiences"
    },
    {
      year: "2021",
      title: "Freelance Creative Programmer",
      description: "Working with global clients on cutting-edge web projects"
    },
    {
      year: "2023",
      title: "Tech Lead at Innovation Studios",
      description: "Leading a team of developers creating next-gen web experiences"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <TimelineDecoration />
        </Canvas>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            I'm a passionate creative programmer with a love for building immersive digital experiences. 
            My journey in the tech world has been driven by curiosity and a desire to blend art with code.
          </p>
        </motion.div>
        
        <motion.div 
          style={{ y, opacity }}
          className="relative mb-16"
        >
          <div className="hidden md:block absolute left-1/2 top-0 w-0.5 h-full bg-blue-200 dark:bg-blue-800 transform -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={index}
                year={item.year}
                title={item.title}
                description={item.description}
                isLeft={index % 2 === 0}
                index={index}
              />
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">My Philosophy</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            I believe that great digital experiences are born at the intersection of creativity, technology, and user needs. 
            My approach combines strong technical foundations with an eye for design and a focus on creating intuitive, engaging interactions.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Whether I'm building complex web applications, interactive visualizations, or experimenting with new technologies, 
            I'm always striving to push boundaries and create work that stands out.
          </p>
        </motion.div>
      </div>
    </section>
  );
};