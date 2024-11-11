import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://127.0.0.1:8000/api/file-upload/', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      alert('File upload failed!');
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <div>
          <input type="file" onChange={handleFileChange} required />
        </div>
        {file && (
          <div>
            <p>{file.name}</p>
            <progress value={progress} max="100"></progress>
          </div>
        )}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
