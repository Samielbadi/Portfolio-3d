import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useTheme } from '../../contexts/ThemeContext';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | '3d' | 'other';
}

const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const barVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { 
      width: `${skill.level}%`, 
      opacity: 1,
      transition: { 
        duration: 1, 
        delay: index * 0.1 
      } 
    }
  };
  
  let barColor = '';
  
  switch(skill.category) {
    case 'frontend':
      barColor = 'bg-blue-500 dark:bg-blue-400';
      break;
    case 'backend':
      barColor = 'bg-green-500 dark:bg-green-400';
      break;
    case '3d':
      barColor = 'bg-purple-500 dark:bg-purple-400';
      break;
    default:
      barColor = 'bg-orange-500 dark:bg-orange-400';
  }
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-700 dark:text-slate-300 font-medium">{skill.name}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
      </div>
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${barColor} rounded-full`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={barVariants}
        />
      </div>
    </div>
  );
};

// 3D floating words representing skills
const SkillsCloud = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const skills = [
    "React", "Three.js", "JavaScript", "TypeScript", 
    "WebGL", "Node.js", "GLSL", "CSS3",
    "WebXR", "GSAP", "Canvas", "SVG"
  ];
  
  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = (Math.random() - 0.5) * 2;
        
        return (
          <Text
            key={i}
            position={[x, y, z]}
            fontSize={0.5}
            color={i % 3 === 0 ? "#3E92CC" : i % 3 === 1 ? "#0A2463" : "#D8D8D8"}
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        );
      })}
    </group>
  );
};

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  const frontendSkills: Skill[] = [
    { name: "HTML5/CSS3", level: 95, category: 'frontend' },
    { name: "JavaScript/TypeScript", level: 90, category: 'frontend' },
    { name: "React.js", level: 92, category: 'frontend' },
    { name: "GSAP Animation", level: 85, category: 'frontend' }
  ];
  
  const backendSkills: Skill[] = [
    { name: "Node.js", level: 80, category: 'backend' },
    { name: "Express.js", level: 75, category: 'backend' },
    { name: "MongoDB", level: 70, category: 'backend' },
    { name: "GraphQL", level: 65, category: 'backend' }
  ];
  
  const threeDSkills: Skill[] = [
    { name: "Three.js", level: 88, category: '3d' },
    { name: "WebGL", level: 80, category: '3d' },
    { name: "GLSL Shaders", level: 75, category: '3d' },
    { name: "WebXR/AR", level: 70, category: '3d' }
  ];
  
  const otherSkills: Skill[] = [
    { name: "UI/UX Design", level: 85, category: 'other' },
    { name: "Git/GitHub", level: 90, category: 'other' },
    { name: "Responsive Design", level: 95, category: 'other' },
    { name: "Performance Optimization", level: 80, category: 'other' }
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <motion.group 
            style={{ rotateY: rotate, rotateX: rotate }} 
          >
            <SkillsCloud />
          </motion.group>
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            My diverse skill set allows me to bring both creative vision and technical expertise to every project.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6">Frontend</h3>
            {frontendSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-6">Backend</h3>
            {backendSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-6">3D & Animation</h3>
            {threeDSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-6">Other Skills</h3>
            {otherSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Tools & Technologies</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "VS Code", "Git", "Figma", "Adobe XD", "Blender", 
              "Webpack", "Jest", "Redux", "Next.js", "Firebase", 
              "AWS", "Docker", "Storybook", "Material UI", "Tailwind CSS"
            ].map((tool, index) => (
              <span 
                key={index} 
                className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};