import React from "react";
import "./imageModal.scss";
import { motion } from "framer-motion";

const ImageModal = ({ srcURL, setSelectedImg }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("imageModal__backdrop")) {
      setSelectedImg(null);
    }
  };
  return (
    <motion.div
      className="imageModal__backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <img src={srcURL} alt="enlarged pic" />
    </motion.div>
  );
};

export default ImageModal;
