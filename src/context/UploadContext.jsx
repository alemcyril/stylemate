import React, { createContext, useContext, useState } from "react";
import apiService from "../services/api";

const UploadContext = createContext(null);

export const UploadProvider = ({ children }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadFile = async (file, type = "wardrobe") => {
    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const response = await apiService.upload.uploadImage(file, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error uploading file");
      throw error;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteFile = async (fileId) => {
    try {
      setUploading(true);
      setError(null);
      await apiService.upload.deleteFile(fileId);
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting file");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const value = {
    uploading,
    uploadProgress,
    error,
    uploadFile,
    deleteFile,
  };

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
};

function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
}

export { useUpload };
