import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { documentApi } from "../../libs/apis";

export default function Upload() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('')

    if (selectedFile) {
      const validTypes = ['application/pdf']
      if (!validTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Only PDF files are allowed.")
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size exceeds the limit of 10MB.")
        return;
      }
      setFile(selectedFile);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return;
    }
    setUploading(true)
    setProgress(20)

    try {
      const result = await documentApi.uploadDoc(file);
      navigate('/documents');
    } catch (e) {
      console.error(e);
      setError(e.message || "Error occurred during file upload; try again");
      setProgress(0);
    } finally {
      setUploading(false);
    }

  };

  return (
    <div className="min-h-screen dark:bg-gray-800">
      <Navbar />
      <div className="pt-25 flex flex-col items-center p-10">
        <h1 className="text-3xl text-white font-bold mb-6">Upload Document</h1>

        <div className="bg-gray-400 p-8 mt-10 rounded-lg shadow w-full max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-black"
              >
                Document File
              </label>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF (Max 10MB)
                    </p>

                    {file && (
                      <div className="mt-4 text-sm text-gray-900">
                        Selected: <span className="font-medium">{file.name}</span>
                      </div>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={uploading}
                    accept=".pdf"
                  />
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50">
                {error}
              </div>
            )}

            {/* Progress Bar */}
            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
                <p className="text-sm text-gray-500 mt-2">Processing document...</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading || !file}
                className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        {/* <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 max-w-xl w-full">
          <h2 className="text-lg font-semibold text-blue-800">
            What happens when you upload?
          </h2>
          <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
            <li>The document is securely uploaded to our servers</li>
            <li>Our AI analyzes the document content</li>
            <li>Metadata is extracted and risk assessment is performed</li>
            <li>A summary is generated for quick review</li>
            <li>Results are stored for future reference</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
