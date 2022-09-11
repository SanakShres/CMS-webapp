import React from "react";
import "./imageUploadModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import ImageUploader from "../imageUploader/ImageUploader";

const ImageUploadModal = ({ handleModalClose }) => {
  return (
    <motion.div
      className="gallery__upload__modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        className="g_modal__overlay"
        style={{ background: "rgba(90,89,120,0.6)" }}
        onClick={handleModalClose}
      ></div>
      <div className="g_modal__container">
        <CloseIcon className="g_upload__close" onClick={handleModalClose} />
        <ImageUploader id="galleryImages" />
      </div>
    </motion.div>
  );
};

export default ImageUploadModal;
