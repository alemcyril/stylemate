import React, { useState } from "react";

const Settings = () => {
  const [email, setEmail] = useState("user@example.com");
  const [username, setUsername] = useState("user123");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., sending data to backend)
    console.log("Settings updated!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow p-4 rounded-md mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">
          Account Settings
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        {/* Profile Information Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email address"
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Change Password
          </h2>
          <div className="space-y-4">
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                placeholder="Confirm your password"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Notification Preferences
          </h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="mr-3"
            />
            <label
              htmlFor="notifications"
              className="text-gray-700 font-medium"
            >
              Receive notifications about new outfit recommendations
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
