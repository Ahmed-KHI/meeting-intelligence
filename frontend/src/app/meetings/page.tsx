"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Meeting {
  id: number;
  title: string;
  status: string;
  created_at: string;
  transcription?: string;
  summary?: {
    title?: string;
    key_points?: string[];
    decisions?: string[];
    action_items?: any[];
  };
}

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchMeetings();
  }, []);

  useEffect(() => {
    filterMeetings();
  }, [meetings, searchQuery, statusFilter]);

  const filterMeetings = () => {
    let filtered = meetings;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((m) => m.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.transcription?.toLowerCase().includes(query) ||
          m.summary?.key_points?.some((p) => p.toLowerCase().includes(query))
      );
    }

    setFilteredMeetings(filtered);
  };

  const fetchMeetings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/meetings/");
      setMeetings(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch meetings");
      setLoading(false);
    }
  };

  const deleteMeeting = async (id: number) => {
    if (!confirm("Are you sure you want to delete this meeting?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/meetings/${id}`);
      setMeetings(meetings.filter((m) => m.id !== id));
    } catch (err: any) {
      alert("Failed to delete meeting");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading meetings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">❌ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Meetings</h1>
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Upload New
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search meetings by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium ${
              statusFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-4 py-2 rounded-lg font-medium ${
              statusFilter === "completed"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setStatusFilter("processing")}
            className={`px-4 py-2 rounded-lg font-medium ${
              statusFilter === "processing"
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Processing
          </button>
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <div className="mb-4 text-sm text-gray-600">
          Found {filteredMeetings.length} result(s) for "{searchQuery}"
        </div>
      )}

      {filteredMeetings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            {searchQuery ? "No meetings found matching your search" : "No meetings yet"}
          </p>
          <Link
            href="/"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Upload your first meeting
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link href={`/meetings/${meeting.id}`}>
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {meeting.title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        meeting.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : meeting.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {meeting.status}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(meeting.created_at).toLocaleString()}
                    </span>
                  </div>
                  {meeting.summary?.key_points && (
                    <div className="mt-3">
                      <p className="text-gray-600 text-sm">
                        {meeting.summary.key_points.slice(0, 2).join(" • ")}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/meetings/${meeting.id}`}
                    className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteMeeting(meeting.id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
