import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const LoginModal = ({ isOpen, onClose }) => {
  const [userType, setUserType] = useState("student");
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setAccounts([...accounts, formData]);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ fullName: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setCreatingAccount(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Login Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          maxHeight: "90vh",
          overflow: "auto",
          borderRadius: "16px",
          padding: "0", // optional: removes double padding with Tailwind
        },
      }}
    >
      <div className="relative p-6">
        <button
          onClick={handleClose}
          className="absolute top-2 right-4 text-4xl font-bold text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          ×
        </button>

        {!creatingAccount ? (
          <div className="space-y-6 mt-10">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setUserType("teacher")}
                className={`px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ${
                  userType === "teacher"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-blue-700"
                }`}
              >
                Teacher
              </button>
              <button
                onClick={() => setUserType("student")}
                className={`px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ${
                  userType === "student"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-green-700"
                }`}
              >
                Student
              </button>
            </div>

            <form className="space-y-4 bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-gray-700">
                Log in as {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </h3>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />
              <button
                type="submit"
                className={`w-full py-3 rounded-full text-lg font-bold transition-all duration-300 ${
                  userType === "teacher"
                    ? "bg-blue-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                Log in
              </button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">Don't have an account?</p>
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg"
                onClick={() => setCreatingAccount(true)}
              >
                Create an Account
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSignUp}
            className="mt-10 space-y-4 bg-white p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-bold text-center">
              Create Your Account
            </h3>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-full text-lg"
            >
              Sign Up
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => setCreatingAccount(false)}
                className="text-purple-600 cursor-pointer hover:underline"
              >
                Log in here
              </span>
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;
