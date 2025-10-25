/* eslint-disable no-unused-vars */
import { motion} from "framer-motion";
import { Link } from "react-router-dom";
import wave from './../assets/wave.svg'
import logo from './../assets/logo.svg'

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center  justify-center text-center px-6 bg-linear-to-b from-white to-blue-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight"
      >
        Simplify Event Ticketing <br />
        <span className="text-gray-600">With Ease</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-gray-600 mt-4 max-w-xl"
      >
        Manage, sell, and verify tickets all in one modern web app — built for speed,
        simplicity, and growth.
      </motion.p>


      <img src={wave} className="st w-full left-0 right-0" alt="wave background logo" />
      

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex gap-4"
      >
        <Link
          to="/auth/signup"
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
        >
          Get Started Free
        </Link>
        <Link
          to="/auth/login"
          className="border border-gray-800 text-gray-600 hover:border-gray-500 hover:text-gray-800 px-6 py-3 rounded-xl font-semibold transition-all"
        >
          Login
        </Link>
      </motion.div>
    </section>
  );
}
