import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/files/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setFiles(response.data);
      } catch (error) {
        alert('Error fetching files');
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (fileId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/file-download/${fileId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `file-${fileId}`;
      link.click();
    } catch (error) {
      alert('File download failed!');
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name} <button onClick={() => handleDownload(file.id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;


