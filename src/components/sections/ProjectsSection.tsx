import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useTheme } from '../../contexts/ThemeContext';
import { Box } from '@react-three/drei';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2 
      } 
    }
  };

  const ProjectModel = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    return (
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        scale={[1.5, 1.5, 0.2]}
        rotation={[0, hovered ? Math.PI / 8 : 0, 0]}
      >
        <meshStandardMaterial 
          color={hovered ? "#0A2463" : "#3E92CC"} 
          metalness={0.5} 
          roughness={0.2} 
        />
      </Box>
    );
  };
  
  return (
    <motion.div
      className="w-full md:w-1/2 lg:w-1/3 p-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col"
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <div className="relative h-48 bg-blue-100 dark:bg-blue-900">
          {/* Project image would normally go here */}
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <ProjectModel />
          </Canvas>
          <img 
            src={project.image} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover z-10"
            loading="lazy"
          />
        </div>
        
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ExternalLink size={16} className="mr-1" /> Live Demo
          </a>
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
          >
            <Github size={16} className="mr-1" /> Code
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 3D floating grid for the background
const FloatingGrid = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  return (
    <group ref={meshRef} position={[0, 0, -10]}>
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 10;
        const size = 0.05 + Math.random() * 0.05;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#3E92CC" : i % 3 === 1 ? "#0A2463" : "#D8D8D8"} 
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Interactive Data Visualization",
      description: "A dynamic dashboard for visualizing complex datasets with interactive 3D charts and filters.",
      image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["React", "Three.js", "D3.js", "TypeScript"],
      liveUrl: "https://example.com/project1",
      githubUrl: "https://github.com/samielbadi/project1"
    },
    {
      id: 2,
      title: "Immersive Learning Platform",
      description: "Educational platform with 3D models and interactive simulations for enhanced learning experiences.",
      image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["WebGL", "React", "Node.js", "MongoDB"],
      liveUrl: "https://example.com/project2",
      githubUrl: "https://github.com/samielbadi/project2"
    },
    {
      id: 3,
      title: "Virtual Product Showcase",
      description: "3D product configurator allowing users to customize and view products in real-time.",
      image: "https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Three.js", "React", "WebGL", "GSAP"],
      liveUrl: "https://example.com/project3",
      githubUrl: "https://github.com/samielbadi/project3"
    },
    {
      id: 4,
      title: "Augmented Reality Web App",
      description: "Web-based AR experience using cutting-edge browser APIs for interactive storytelling.",
      image: "https://images.pexels.com/photos/4382783/pexels-photo-4382783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["WebXR", "AR.js", "JavaScript", "Three.js"],
      liveUrl: "https://example.com/project4",
      githubUrl: "https://github.com/samielbadi/project4"
    },
    {
      id: 5,
      title: "Interactive Music Visualizer",
      description: "Real-time 3D visualization of music with dynamic effects responding to audio analysis.",
      image: "https://images.pexels.com/photos/1191710/pexels-photo-1191710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Web Audio API", "Three.js", "GLSL", "React"],
      liveUrl: "https://example.com/project5",
      githubUrl: "https://github.com/samielbadi/project5"
    },
    {
      id: 6,
      title: "3D Social Network",
      description: "Experimental social platform with 3D spaces for user interaction and content sharing.",
      image: "https://images.pexels.com/photos/4100835/pexels-photo-4100835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      tags: ["Socket.io", "Three.js", "React", "Firebase"],
      liveUrl: "https://example.com/project6",
      githubUrl: "https://github.com/samielbadi/project6"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <FloatingGrid />
        </Canvas>
      </div>
      
      <motion.div 
        style={{ y }} 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            Check out some of my recent work. Each project represents a unique challenge and solution.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap -mx-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/samielbadi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} className="mr-2" />
            View More on GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};