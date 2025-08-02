import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, BookOpen, LayoutDashboard, Menu, Trash2 } from "lucide-react";
import ChatBox from "./ChatBox";

const TeacherPage = () => (
  <div className="p-10 max-w-3xl mx-auto">
    <h1 className="text-4xl font-bold mb-4 text-[#162744] animate-fadeIn">
      Hi Teacher 👋
    </h1>
  </div>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCapacity, setNewCapacity] = useState("");

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("teacherCourses");
    return saved
      ? JSON.parse(saved)
      : [
          {
            title: "Biology 101",
            students: 30,
            capacity: 30,
            color: "bg-blue-500",
            code: "12345",
          },
          {
            title: "Algebra II",
            students: 25,
            capacity: 30,
            color: "bg-green-500",
            code: "23456",
          },
        ];
  });

  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    localStorage.setItem("teacherCourses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("chatMessages");
      if (stored) {
        const allMessages = JSON.parse(stored);
        const studentMessages = allMessages.filter(
          (msg) => msg.role === "student"
        );
        setInbox(studentMessages.reverse());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Courses", icon: <BookOpen size={20} /> },
    { label: "Inbox", icon: <Mail size={20} /> },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => [...prev, file]);
    }
  };

  const generateClassCode = () =>
    Math.floor(10000 + Math.random() * 90000).toString();

  const handleCreateCourse = () => {
    if (!newTitle || !newCapacity) return;

    const colors = [
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-emerald-500",
      "bg-indigo-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCourse = {
      title: newTitle,
      students: 0,
      capacity: parseInt(newCapacity),
      color: randomColor,
      code: generateClassCode(),
    };

    setCourses([...courses, newCourse]);
    setNewTitle("");
    setNewCapacity("");
    setShowCreateForm(false);
  };

  const handleDeleteCourse = (codeToDelete) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );
    if (confirmed) {
      const updated = courses.filter((course) => course.code !== codeToDelete);
      setCourses(updated);
      if (selectedCourse?.code === codeToDelete) setSelectedCourse(null);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-gray-100 font-sans">
      <aside
        className={`$${
          collapsed ? "w-20" : "w-64"
        } transition-all duration-300 p-4 bg-white border-r shadow-md flex flex-col`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 flex items-center space-x-2 focus:outline-none"
        >
          <Menu size={24} className="text-[#162744]" />
          {!collapsed && (
            <span className="text-xl font-bold text-[#162744]">Polyglot</span>
          )}
        </button>

        <ul className="space-y-6">
          {navItems.map((item) => (
            <li
              key={item.label}
              onClick={() => {
                setActiveTab(item.label);
                setSelectedCourse(null);
              }}
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-50 transition-all ${
                activeTab === item.label
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === "Dashboard" && (
          <>
            <TeacherPage />
            <div className="mb-6 flex flex-wrap gap-4">
              <motion.button
                onClick={() => setShowCreateForm(!showCreateForm)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-md font-semibold text-lg transition duration-300 hover:shadow-xl"
              >
                ➕ Create a Class
              </motion.button>
            </div>

            {showCreateForm && (
              <div className="mt-4 bg-white rounded-xl p-6 shadow-md max-w-md">
                <h3 className="text-lg font-semibold mb-4">New Class Info</h3>
                <input
                  type="text"
                  placeholder="Class name"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mb-3 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={newCapacity}
                  onChange={(e) => setNewCapacity(e.target.value)}
                  className="w-full mb-4 p-2 border rounded"
                />
                <button
                  onClick={handleCreateCourse}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Create
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === "Courses" && !selectedCourse && (
          <>
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {courses.map((course) => (
                <motion.div
                  key={course.code}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all relative"
                >
                  <div
                    className="absolute top-2 right-2 p-1 rounded hover:bg-red-100"
                    onClick={() => handleDeleteCourse(course.code)}
                  >
                    <Trash2 className="text-red-500 cursor-pointer" size={18} />
                  </div>

                  <div
                    className={`${course.color} h-16 cursor-pointer`}
                    onClick={() => setSelectedCourse(course)}
                  ></div>
                  <div
                    className="bg-white p-4 cursor-pointer"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-600">
                      {course.students}/{course.capacity} students
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Code: <span className="font-mono">{course.code}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {activeTab === "Courses" && selectedCourse && (
          <>
            <button
              onClick={() => setSelectedCourse(null)}
              className="mb-4 text-blue-600 underline"
            >
              ← Back to Courses
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedCourse.title}</h2>
            <p className="text-gray-600 mb-1">
              Enrolled: {selectedCourse.students}/{selectedCourse.capacity}
            </p>
            <p className="text-sm text-gray-700 mb-6">
              Class Code:{" "}
              <span className="font-mono font-bold">{selectedCourse.code}</span>
            </p>

            <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
              <h3 className="text-xl font-semibold mb-3">
                📌 Upload Documents
              </h3>
              <input
                type="file"
                onChange={handleFileUpload}
                className="mb-4 block"
              />
              <ul className="text-sm text-gray-700 list-disc list-inside">
                {uploadedFiles.map((file, i) => (
                  <li key={i}>{file.name}</li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-2">
                * Uploaded files are not saved permanently (demo only)
              </p>
              <ChatBox
                classCode={selectedCourse.code}
                user="Mr. Smith"
                role="teacher"
              />
            </div>
          </>
        )}

        {activeTab === "Inbox" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Inbox</h2>
            <div className="space-y-4">
              {inbox.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#162744]">
                      {msg.name}
                    </span>
                    <span className="text-xs text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
