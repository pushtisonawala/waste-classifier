'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export function UploadZone({ onFileSelect, isLoading = false }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
        isDragActive
          ? 'border-[rgb(var(--waste-plastic))] bg-blue-50'
          : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
      } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        disabled={isLoading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="flex flex-col items-center justify-center py-12">
        <div className={`p-3 rounded-full mb-4 ${isDragActive ? 'bg-blue-100' : 'bg-gray-200'}`}>
          <Upload
            size={32}
            className={isDragActive ? 'text-[rgb(var(--waste-plastic))]' : 'text-gray-600'}
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isDragActive ? 'Drop image here' : 'Drag image here or click to browse'}
        </h3>

        <p className="text-sm text-gray-600">
          Supported formats: JPG, PNG, WebP (Max 10MB)
        </p>
      </div>
    </div>
  );
}
