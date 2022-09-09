import React from "react";
import "./imageUploadModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { motion } from "framer-motion";

const ImageUploadModal = ({ handleModalClose }) => {
  const handleGalleryChange = (e) => {
    console.log("gallery upload btn");
  };
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
        <label className="g_upload__container" htmlFor="galleryImages">
          <CloudUploadIcon className="g_upload__icon" />
          <div className="g_upload__info">
            <span>Browse</span> images here
            <div>Supported files .JPG, .JPEG, .PNG</div>
          </div>
          <input
            name="images"
            type="file"
            multiple
            id="galleryImages"
            style={{ display: "none" }}
          />
        </label>
        <button
          className="g_upload__btn"
          type="button"
          onClick={handleGalleryChange}
        >
          Upload images
        </button>
      </div>
    </motion.div>
  );
};

export default ImageUploadModal;
