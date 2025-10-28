"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface ActionItem {
  id: number;
  description: string;
  assignee?: string;
  priority: string;
  status: string;
  due_date?: string;
}

interface Meeting {
  id: number;
  title: string;
  status: string;
  created_at: string;
  audio_filename?: string;
  transcription?: string;
  summary?: {
    title?: string;
    key_points?: string[];
    decisions?: string[];
    action_items?: any[];
  };
}

export default function MeetingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchMeeting();
      fetchActionItems();
    }
  }, [params.id]);

  const fetchMeeting = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/meetings/${params.id}`
      );
      setMeeting(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to fetch meeting");
      setLoading(false);
    }
  };

  const fetchActionItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/meetings/${params.id}/actions`
      );
      setActionItems(response.data);
    } catch (err) {
      console.error("Failed to fetch action items:", err);
    }
  };

  const deleteMeeting = async () => {
    if (!confirm("Are you sure you want to delete this meeting?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/meetings/${params.id}`);
      router.push("/meetings");
    } catch (err) {
      alert("Failed to delete meeting");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading meeting...</p>
        </div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">❌ {error || "Meeting not found"}</p>
          <Link href="/meetings" className="text-blue-600 hover:underline mt-2 inline-block">
            ← Back to meetings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link href="/meetings" className="text-blue-600 hover:underline mb-2 inline-block">
            ← Back to all meetings
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{meeting.title}</h1>
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
        </div>
        <button
          onClick={deleteMeeting}
          className="text-red-600 hover:text-red-800 px-4 py-2 rounded border border-red-600 hover:bg-red-50"
        >
          Delete Meeting
        </button>
      </div>

      {/* Summary */}
      {meeting.summary && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Summary</h2>
          
          {meeting.summary.key_points && meeting.summary.key_points.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Key Points:</h3>
              <ul className="list-disc list-inside space-y-1">
                {meeting.summary.key_points.map((point, idx) => (
                  <li key={idx} className="text-gray-700">{point}</li>
                ))}
              </ul>
            </div>
          )}

          {meeting.summary.decisions && meeting.summary.decisions.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">Decisions Made:</h3>
              <ul className="list-disc list-inside space-y-1">
                {meeting.summary.decisions.map((decision, idx) => (
                  <li key={idx} className="text-gray-700">{decision}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Action Items */}
      {actionItems.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">✅ Action Items</h2>
          <div className="space-y-3">
            {actionItems.map((item) => (
              <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-gray-900 font-medium">{item.description}</p>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="text-gray-600">👤 {item.assignee || "Unassigned"}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      item.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : item.priority === "low"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.priority}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      item.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transcription */}
      {meeting.transcription && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📄 Full Transcription</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{meeting.transcription}</p>
          </div>
        </div>
      )}
    </div>
  );
}
