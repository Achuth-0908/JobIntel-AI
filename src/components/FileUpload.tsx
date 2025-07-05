import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface FileUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onError: (error: string) => void;
  onLoadingChange: (loading: boolean) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onAnalysisComplete, onError, onLoadingChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState('');
  const [uploadMode, setUploadMode] = useState<'file' | 'text'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const allowedTypes = ['application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      onError('Please upload a PDF or TXT file.');
      return;
    }

    if (file.size > 16 * 1024 * 1024) {
      onError('File size must be less than 16MB.');
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    onLoadingChange(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onAnalysisComplete(result);
      } else {
        onError(result.error || 'Failed to analyze resume');
      }
    } catch (error) {
      onError('Failed to connect to the server. Please make sure the Flask API is running on port 5000.');
    } finally {
      onLoadingChange(false);
    }
  };

  const analyzeText = async () => {
    if (!textInput.trim()) {
      onError('Please enter your resume text.');
      return;
    }

    onLoadingChange(true);

    try {
      const response = await fetch('http://localhost:5000/analyze_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput }),
      });

      const result = await response.json();

      if (result.success) {
        onAnalysisComplete(result);
      } else {
        onError(result.error || 'Failed to analyze resume text');
      }
    } catch (error) {
      onError('Failed to connect to the server. Please make sure the Flask API is running on port 5000.');
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-toggle">
        <div className="toggle-buttons">
          <button
            onClick={() => setUploadMode('file')}
            className={`toggle-button ${uploadMode === 'file' ? 'active' : ''}`}
          >
            Upload File
          </button>
          <button
            onClick={() => setUploadMode('text')}
            className={`toggle-button ${uploadMode === 'text' ? 'active' : ''}`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {uploadMode === 'file' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileInputChange}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
            />

            {selectedFile ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div className="upload-icon" style={{ background: 'var(--success-color)' }}>
                  <CheckCircle size={32} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3>File Selected</h3>
                  <div className="file-selected">
                    <FileText size={16} />
                    <span>{selectedFile.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      style={{ 
                        marginLeft: '0.5rem', 
                        padding: '0.25rem', 
                        background: 'transparent', 
                        border: 'none', 
                        cursor: 'pointer',
                        borderRadius: '4px'
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div className="upload-icon">
                  <Upload size={32} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3>Drop your resume here</h3>
                  <p>or click to browse files</p>
                  <div className="upload-meta">
                    <span>PDF, TXT</span>
                    <span>•</span>
                    <span>Max 16MB</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedFile && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={uploadFile} className="btn btn-primary btn-large">
                Analyze Resume
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="text-input-container">
            <label className="text-input-label">
              Paste your resume text below:
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Copy and paste your resume content here..."
              className="text-input"
            />
            <div className="text-input-meta">
              <span>{textInput.length} characters</span>
              {textInput.trim() && (
                <button
                  onClick={() => setTextInput('')}
                  style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: 'var(--text-muted)', 
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {textInput.trim() && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={analyzeText} className="btn btn-primary btn-large">
                Analyze Text
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;