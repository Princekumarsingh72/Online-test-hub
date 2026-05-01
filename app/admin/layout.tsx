"use client"

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl mb-6 font-bold">Admin Panel</h2>

        <ul className="space-y-4">
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/admin/subject">Subjects</a></li>
          <li><a href="/admin/questions">Questions</a></li>
          <li><a href="/admin/tests">Tests</a></li>
          <li><a href="/admin/students">Students</a></li>
          <li><a href="/admin/results">Results</a></li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100">
        {children}
      </div>

    </div>
  );
}