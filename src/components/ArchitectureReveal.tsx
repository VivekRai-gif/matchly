import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Database, GitBranch, Shield, Sparkles } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  position: { x: number; y: number };
}

interface Connection {
  from: string;
  to: string;
}

export const ArchitectureReveal = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const nodes: Node[] = [
    {
      id: 'input',
      label: 'Job Description\n+ Resumes',
      icon: <Database className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      position: { x: 50, y: 20 },
    },
    {
      id: 'parser',
      label: 'Resume Parser\nAgent',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      position: { x: 20, y: 50 },
    },
    {
      id: 'matcher',
      label: 'Skill Matcher\nAgent',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-500',
      position: { x: 50, y: 50 },
    },
    {
      id: 'bias',
      label: 'Bias Audit\nAgent',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      position: { x: 80, y: 50 },
    },
    {
      id: 'synthesizer',
      label: 'Decision\nSynthesizer',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      position: { x: 50, y: 80 },
    },
  ];

  const connections: Connection[] = [
    { from: 'input', to: 'parser' },
    { from: 'input', to: 'matcher' },
    { from: 'input', to: 'bias' },
    { from: 'parser', to: 'synthesizer' },
    { from: 'matcher', to: 'synthesizer' },
    { from: 'bias', to: 'synthesizer' },
  ];

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Multi-Agent <span className="text-gradient">Architecture</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four specialized AI agents collaborate to ensure fair, transparent decisions
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="relative max-w-4xl mx-auto aspect-[4/3]">
          {/* SVG for Connections */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {connections.map((conn, index) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <motion.line
                  key={index}
                  x1={`${fromNode.position.x}%`}
                  y1={`${fromNode.position.y}%`}
                  x2={`${toNode.position.x}%`}
                  y2={`${toNode.position.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              style={{
                position: 'absolute',
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="z-10"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative group cursor-pointer"
              >
                {/* Glow Ring */}
                <div className={`absolute inset-0 bg-gradient-to-br ${node.color} blur-xl opacity-50 group-hover:opacity-75 transition-opacity rounded-2xl scale-110`} />
                
                {/* Node Card */}
                <div className="relative glass-strong rounded-2xl p-6 border-2 border-white/20 group-hover:border-blue-500/50 transition-all min-w-[160px]">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center mx-auto mb-3`}>
                    {node.icon}
                  </div>
                  <div className="text-center text-sm font-semibold text-white whitespace-pre-line">
                    {node.label}
                  </div>
                </div>

                {/* Pulse Animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${node.color} rounded-2xl -z-10`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { step: '01', title: 'Parse', desc: 'Extract structured data from resumes' },
            { step: '02', title: 'Match', desc: 'Semantic skill alignment with job requirements' },
            { step: '03', title: 'Audit', desc: 'Detect and flag potential bias patterns' },
            { step: '04', title: 'Rank', desc: 'Generate transparent, explainable scores' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="text-4xl font-bold text-gradient mb-2">{item.step}</div>
              <div className="text-lg font-semibold text-white mb-1">{item.title}</div>
              <div className="text-sm text-gray-400">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
