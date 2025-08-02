import React, { useEffect, useState } from "react";

export default function ChatBox({ classCode, user, role }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(`chat-${classCode}`);
    if (saved) setMessages(JSON.parse(saved));
  }, [classCode]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: user,
      role,
      text: input.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem(`chat-${classCode}`, JSON.stringify(updated));
    setInput("");
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow-md max-w-2xl">
      <h3 className="text-xl font-bold mb-3">💬 Chat with the Teacher</h3>
      <div className="h-60 overflow-y-auto mb-3 border p-3 rounded">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 ${
                msg.role === "teacher" ? "text-blue-700" : "text-green-700"
              }`}
            >
              <span className="font-semibold">{msg.sender}</span>:{" "}
              <span>{msg.text}</span>{" "}
              <span className="text-xs text-gray-400">({msg.timestamp})</span>
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
