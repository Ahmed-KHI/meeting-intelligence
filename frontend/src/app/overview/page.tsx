"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Meeting {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

interface Task {
  id: number;
  description: string;
  status: string;
  priority: string;
  meeting_id: number;
  created_at: string;
}

interface Stats {
  totalMeetings: number;
  completedMeetings: number;
  processingMeetings: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  completionRate: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalMeetings: 0,
    completedMeetings: 0,
    processingMeetings: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    completionRate: 0,
  });
  const [recentMeetings, setRecentMeetings] = useState<Meeting[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [meetingsRes, tasksRes] = await Promise.all([
        axios.get("http://localhost:8000/api/meetings/"),
        axios.get("http://localhost:8000/api/tasks/"),
      ]);

      const meetings: Meeting[] = meetingsRes.data;
      const tasks: Task[] = tasksRes.data;

      const completedMeetings = meetings.filter((m) => m.status === "completed").length;
      const processingMeetings = meetings.filter((m) => m.status === "processing").length;
      const pendingTasks = tasks.filter((t) => t.status === "pending").length;
      const completedTasks = tasks.filter((t) => t.status === "completed").length;

      setStats({
        totalMeetings: meetings.length,
        completedMeetings,
        processingMeetings,
        totalTasks: tasks.length,
        pendingTasks,
        completedTasks,
        completionRate: tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0,
      });

      setRecentMeetings(meetings.slice(0, 5));
      setRecentTasks(tasks.slice(0, 8));
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch dashboard data");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Dashboard</h1>
        <p className="text-gray-600">Overview of your meetings and tasks</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Meetings</p>
              <p className="text-4xl font-bold mt-2">{stats.totalMeetings}</p>
            </div>
            <div className="text-5xl opacity-50">🎙️</div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-blue-100">{stats.completedMeetings} completed</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Tasks</p>
              <p className="text-4xl font-bold mt-2">{stats.totalTasks}</p>
            </div>
            <div className="text-5xl opacity-50">✅</div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-100">{stats.completedTasks} completed</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Pending Tasks</p>
              <p className="text-4xl font-bold mt-2">{stats.pendingTasks}</p>
            </div>
            <div className="text-5xl opacity-50">⏳</div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-yellow-100">Requires attention</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Completion Rate</p>
              <p className="text-4xl font-bold mt-2">{stats.completionRate}%</p>
            </div>
            <div className="text-5xl opacity-50">📈</div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-purple-100">Task completion</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Meetings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">📋 Recent Meetings</h2>
            <Link href="/meetings" className="text-blue-600 hover:underline text-sm font-medium">
              View All →
            </Link>
          </div>

          {recentMeetings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No meetings yet</p>
          ) : (
            <div className="space-y-3">
              {recentMeetings.map((meeting) => (
                <Link
                  key={meeting.id}
                  href={`/meetings/${meeting.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(meeting.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
                        meeting.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : meeting.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {meeting.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/"
            className="mt-4 block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + Upload New Meeting
          </Link>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">✅ Recent Tasks</h2>
            <Link href="/dashboard" className="text-blue-600 hover:underline text-sm font-medium">
              View All →
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No tasks yet</p>
          ) : (
            <div className="space-y-2">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    readOnly
                    className="mt-1 h-5 w-5 text-green-600 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        task.status === "completed"
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {task.description.length > 60
                        ? task.description.substring(0, 60) + "..."
                        : task.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "low"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                      <Link
                        href={`/meetings/${task.meeting_id}`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View meeting
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">📤</span>
            <div>
              <p className="font-medium text-gray-900">Upload Meeting</p>
              <p className="text-sm text-gray-600">Add new recording</p>
            </div>
          </Link>
          <Link
            href="/meetings"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">📋</span>
            <div>
              <p className="font-medium text-gray-900">View Meetings</p>
              <p className="text-sm text-gray-600">Browse all recordings</p>
            </div>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <span className="text-3xl">✅</span>
            <div>
              <p className="font-medium text-gray-900">Manage Tasks</p>
              <p className="text-sm text-gray-600">Update action items</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
