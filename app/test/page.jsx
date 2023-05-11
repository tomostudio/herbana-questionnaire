'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function test() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleComponent = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleComponent}>Toggle Component</button>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="myComponent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>Hello, world!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default test