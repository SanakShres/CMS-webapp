import React, { useEffect, useState } from "react";

import "./gallery.scss";
import { db } from "../../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import ImageUploadModal from "../modal/ImageUploadModal";
import ImageModal from "../modal/ImageModal";
import { motion } from "framer-motion";

const Gallery = () => {
  const [files, setFiles] = useState([]);
  const [uploadModal, setUploadModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "images"),
      orderBy("createdAt", "desc"),
      limit(12)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        let images = [];
        snap.forEach((doc) => {
          images.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setFiles(images);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const handleUploadModalClose = () => {
    setUploadModal(false);
  };

  uploadModal
    ? document.body.classList.add("active-modal")
    : document.body.classList.remove("active-modal");

  return (
    <div className="gallery">
      <h1>Image Gallery</h1>
      <p>Welcome to your Image Gallery</p>
      <div className="gallery__upload" onClick={() => setUploadModal(true)}>
        +
      </div>
      {uploadModal && (
        <ImageUploadModal handleModalClose={handleUploadModalClose} />
      )}
      <div className="gallery__wrapper">
        {files &&
          files.map((file) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="gallery__image"
              key={file.id}
              onClick={() => setSelectedImg(file.url)}
            >
              <img src={file.url} alt="" />
            </motion.div>
          ))}
      </div>
      {selectedImg && (
        <ImageModal srcURL={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
};

export default Gallery;
