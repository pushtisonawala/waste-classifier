'use client';

import { useState } from 'react';
import { UploadZone } from '@/components/upload-zone';
import { ClassificationResult } from '@/components/classification-result';
import { Button } from '@/components/ui/button';
import { Classification } from '@/lib/types';
import { mockClassifications } from '@/lib/mock-data';

export default function UploadPage() {
  const [result, setResult] = useState<Classification | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const handleFileSelect = (file: File) => {
    setIsClassifying(true);

    setTimeout(() => {
      const randomResult =
        mockClassifications[Math.floor(Math.random() * mockClassifications.length)];
      setResult({
        ...randomResult,
        timestamp: new Date(),
      });
      setIsClassifying(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload & Classify</h1>
        <p className="text-gray-600 mt-2">
          Upload an image of waste to automatically classify it
        </p>
      </div>

      {!result ? (
        <UploadZone onFileSelect={handleFileSelect} isLoading={isClassifying} />
      ) : (
        <div>
          <ClassificationResult result={result} />

          <div className="mt-6">
            <Button
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Classify Another
            </Button>
          </div>
        </div>
      )}

      {isClassifying && (
        <div className="text-center py-8">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
          <p className="mt-4 text-gray-600">Analyzing image...</p>
        </div>
      )}
    </div>
  );
}
