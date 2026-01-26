import { motion } from "motion/react";

export function TitleSubtext() {
  return (
    <motion.p
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      className="text-xl font-medium"
    >
      O clássico jogo da velha!
    </motion.p>
  );
}
