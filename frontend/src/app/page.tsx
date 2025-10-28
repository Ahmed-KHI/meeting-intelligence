'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface RecentMeeting {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');
  const [message, setMessage] = useState('');
  const [meetingId, setMeetingId] = useState<number | null>(null);
  const [recentMeetings, setRecentMeetings] = useState<RecentMeeting[]>([]);

  useEffect(() => {
    fetchRecentMeetings();
  }, []);

  const fetchRecentMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/meetings/?limit=5');
      setRecentMeetings(response.data);
    } catch (err) {
      console.error('Failed to fetch recent meetings');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('⚠️ Please select a file');
      return;
    }

    setUploading(true);
    setMessage('');
    setUploadProgress(10);
    setProcessingStage('📤 Uploading file...');

    const formData = new FormData();
    formData.append('file', file);
    if (title) formData.append('title', title);

    try {
      setUploadProgress(30);
      setProcessingStage('☁️ File uploaded, processing...');

      const response = await axios.post('http://localhost:8000/api/meetings/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(Math.min(percentCompleted, 30));
          }
        },
      });

      setUploadProgress(40);
      setProcessingStage('🎙️ Transcribing audio with AI...');
      
      // Simulate progress during AI processing
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 5;
        });
      }, 2000);

      // Wait a bit to simulate the processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      setProcessingStage('✅ Processing complete!');
      setMessage('✅ Meeting processed successfully!');
      setMeetingId(response.data.id);
      setFile(null);
      setTitle('');
      
      // Redirect to meeting page
      setTimeout(() => {
        window.location.href = `/meetings/${response.data.id}`;
      }, 1500);

    } catch (error: any) {
      setMessage(`❌ Error: ${error.response?.data?.detail || error.message || 'Upload failed'}`);
      setProcessingStage('');
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎙️ AI-Powered Meeting Assistant
        </h1>
        <p className="text-xl text-gray-600">
          Upload a meeting recording and get instant transcription, summary, and action items
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Upload Meeting Recording</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
              <div className="mb-6">
                <span className="text-6xl">🎤</span>
              </div>
              
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              
              <label
                htmlFor="file-upload"
                className={`cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {uploading ? 'Processing...' : 'Choose Audio/Video File'}
              </label>

              {file && (
                <div className="mt-4 text-sm text-gray-600">
                  Selected: <span className="font-medium">{file.name}</span>
                  <span className="ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
              )}

              <p className="mt-4 text-sm text-gray-500">
                Supports: MP3, WAV, MP4, WebM, M4A, OGG (Max: 100MB)
              </p>
            </div>

            {/* Optional Title */}
            {file && !uploading && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Team Standup - Oct 28"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* Upload Button */}
            {file && !uploading && (
              <button
                onClick={handleUpload}
                className="mt-6 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                🚀 Upload & Process with AI
              </button>
            )}

            {/* Progress Bar */}
            {uploading && (
              <div className="mt-6">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{processingStage}</span>
                  <span className="text-sm font-medium text-blue-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  This may take 1-2 minutes for AI transcription and analysis...
                </p>
              </div>
            )}

            {/* Message */}
            {message && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  message.includes('❌')
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : message.includes('✅')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                }`}
              >
                {message}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-blue-900">AI Transcription</h3>
              <p className="text-sm text-blue-700 mt-1">Accurate speech-to-text</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-semibold text-green-900">Smart Summary</h3>
              <p className="text-sm text-green-700 mt-1">Key points & decisions</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-semibold text-purple-900">Action Items</h3>
              <p className="text-sm text-purple-700 mt-1">Auto-extracted tasks</p>
            </div>
          </div>
        </div>

        {/* Recent Meetings Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">📋 Recent Meetings</h2>
            
            {recentMeetings.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                No meetings yet. Upload your first one!
              </p>
            ) : (
              <div className="space-y-3">
                {recentMeetings.map((meeting) => (
                  <Link
                    key={meeting.id}
                    href={`/meetings/${meeting.id}`}
                    className="block p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {meeting.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          meeting.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : meeting.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {meeting.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(meeting.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/meetings"
              className="mt-4 block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
            >
              View All Meetings →
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">📊 Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Meetings:</span>
                <span className="font-bold">{recentMeetings.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Powered by:</span>
                <span className="font-bold">Gemini AI 2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
