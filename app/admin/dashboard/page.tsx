"use client"

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl shadow">
          Total Subjects
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Total Tests
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Total Students
        </div>
      </div>
    </div>
  );
}