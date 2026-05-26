import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Bot, Network, Cpu } from 'lucide-react';

const aiFeatures = [
  {
    icon: Brain,
    title: 'LLM Integration',
    description: 'Building applications powered by advanced language models like GPT-4, Claude, and Llama for natural language processing and generation.'
  },
  {
    icon: Network,
    title: 'RAG Systems',
    description: 'Developing Retrieval-Augmented Generation systems using vector databases (Pinecone, Chroma) for context-aware AI assistants.'
  },
  {
    icon: Bot,
    title: 'Agentic Workflows',
    description: 'Creating autonomous AI agents capable of reasoning, tool use, and complex task execution using LangChain and AutoGen.'
  },
  {
    icon: Cpu,
    title: 'AI Automation',
    description: 'Streamlining business processes with intelligent automation, intelligent document processing, and predictive analytics.'
  }
];

export function AISection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Neural Network Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
            >
              <Brain className="w-4 h-4" />
              Future-Ready
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tighter"
            >
              Pioneering the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">AI Revolution</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              I don't just build traditional web apps. I integrate cutting-edge artificial intelligence to create smart, context-aware, and autonomous digital products that solve complex problems.
            </motion.p>
          </div>

          <div ref={ref} className="flex-1 grid sm:grid-cols-2 gap-4 w-full">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 border-accent/20 hover:border-accent/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <feature.icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
