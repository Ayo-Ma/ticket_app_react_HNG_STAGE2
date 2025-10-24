/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Shield, CreditCard, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-10 h-10 text-gray-600" />,
    title: "Secure Access",
    desc: "Your data and tickets are protected with top-tier encryption and authentication.",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-gray-600" />,
    title: "Easy Payments",
    desc: "Seamless payment integration lets users pay instantly with confidence.",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-gray-600" />,
    title: "Real-time Analytics",
    desc: "Track event sales, revenue, and attendance in a beautiful dashboard.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-white text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Why People Love <span className="text-gray-600">TicketApp</span>
      </h2>
      <p className="text-gray-600 mb-12">
        We combine beautiful design, performance, and functionality to create something special.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-2xl  bg-white border  transition-all"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
