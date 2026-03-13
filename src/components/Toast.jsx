import { AnimatePresence, motion } from 'framer-motion';

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold shadow-lg text-base"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
