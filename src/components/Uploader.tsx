import React from 'react';

export default function Uploader({children}){
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Upload Your Image</h1>
      <div className="space-y-4">
        <div className="relative border-dashed border-2 border-gray-300 rounded-lg p-6 cursor-pointer">
          <input type="file" id="file-input" className="absolute top-0 left-0 w-full h-full opacity-0"/>
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 11a2 2 0 114 0 2 2 0 01-4 0z"/>
              <path fill-rule="evenodd"
                    d="M3 3a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H3zm15 2a1 1 0 00-1-1H3a1 1 0 00-1 1v11a1 1 0 001 1h4v-2h4v2h4a1 1 0 001-1V5z"
                    clip-rule="evenodd"/>
            </svg>
            <p className="mt-1 text-sm text-gray-600">
              <span className="text-blue-500">Upload</span> your image or drag and drop here
            </p>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300">
          Upload Image
        </button>
      </div>
    </div>
  )
}