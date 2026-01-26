import { motion } from "motion/react";
import { TitleSubtext } from "@/components/screens/MainMenu/GameTitle/TitleSubtext";
import { TitleText } from "@/components/screens/MainMenu/GameTitle/TitleText";

export function GameTitle() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
          },
        },
      }}
      className="flex flex-col items-center space-y-4 text-center"
    >
      <TitleText />
      <TitleSubtext />
    </motion.div>
  );
}
