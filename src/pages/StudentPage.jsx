import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, UserPlus, LayoutDashboard } from "lucide-react";
import ChatBox from "./ChatBox"; // Adjust path if needed

const StudentPage = () => {
  const [classCode, setClassCode] = useState("");
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedClass, setSelectedClass] = useState(null);
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("teacherCourses");
    if (stored) {
      setAvailableClasses(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("chatMessages");
      if (stored) {
        const allMessages = JSON.parse(stored);
        const relevantMessages = allMessages.filter(
          (msg) => msg.role === "teacher"
        );
        setInbox(relevantMessages.reverse());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinClass = () => {
    const trimmedCode = classCode.trim();
    if (!trimmedCode) return;

    const found = availableClasses.find((cls) => cls.code === trimmedCode);

    if (!found) {
      alert("❌ Class code not found.");
      return;
    }

    if (joinedClasses.find((c) => c.code === trimmedCode)) {
      alert("⚠️ You have already joined this class.");
      return;
    }

    if (found.students >= found.capacity) {
      alert("⚠️ This class is full.");
      return;
    }

    found.students += 1;
    const updatedCourses = availableClasses.map((cls) =>
      cls.code === found.code ? found : cls
    );
    setAvailableClasses(updatedCourses);
    localStorage.setItem("teacherCourses", JSON.stringify(updatedCourses));

    setJoinedClasses([...joinedClasses, found]);
    setClassCode("");
    setActiveTab("Dashboard");
  };

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Join Class", icon: <UserPlus size={20} /> },
    { label: "Inbox", icon: <Mail size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-gray-100 font-sans">
      <aside className="w-64 p-6 bg-white border-r shadow-md">
        <h1 className="text-2xl font-extrabold text-[#162744] mb-8">
          Polyglot
        </h1>
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li
              key={item.label}
              onClick={() => {
                setActiveTab(item.label);
                setSelectedClass(null);
              }}
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-50 transition-all ${
                activeTab === item.label
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-6 text-[#162744] animate-fadeIn">
            Hi Student 🎓
          </h2>

          {selectedClass && (
            <>
              <button
                className="text-blue-600 underline mb-4"
                onClick={() => setSelectedClass(null)}
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold mb-2">{selectedClass.title}</h2>
              <p className="text-gray-600 mb-1">
                Class Code:{" "}
                <span className="font-mono">{selectedClass.code}</span>
              </p>
              <p className="text-gray-600 mb-6">
                Enrolled: {selectedClass.students}/{selectedClass.capacity}
              </p>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">📚 Welcome!</h3>
                <p className="text-gray-700 mb-4">
                  You’ve successfully entered the class. Stay tuned for updates,
                  assignments, and resources!
                </p>
                <ChatBox
                  classCode={selectedClass.code}
                  user="Student A"
                  role="student"
                />
              </div>
            </>
          )}

          {activeTab === "Dashboard" && !selectedClass && (
            <>
              <h2 className="text-2xl font-bold mb-4">My Classes</h2>
              {joinedClasses.length === 0 ? (
                <p className="text-gray-600">
                  You haven’t joined any classes yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {joinedClasses.map((cls, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedClass(cls)}
                      className="cursor-pointer bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all"
                    >
                      <h3 className="font-semibold text-lg">{cls.title}</h3>
                      <p className="text-sm text-gray-600">
                        Code: <span className="font-mono">{cls.code}</span>
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "Join Class" && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Join a Class</h2>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  className="border p-2 w-64 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter class code"
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
                  onClick={handleJoinClass}
                >
                  Join
                </button>
              </div>
            </div>
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
        </div>
      </main>
    </div>
  );
};

export default StudentPage;
