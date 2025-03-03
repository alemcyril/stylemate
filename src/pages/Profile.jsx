import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-semibold">John Doe</h1>
              <p className="text-sm">Personal Stylist Enthusiast</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Profile Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-600">Full Name</p>
              <p className="text-gray-800 font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="text-gray-800 font-medium">john.doe@example.com</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="text-gray-800 font-medium">+1 234 567 890</p>
            </div>
            <div>
              <p className="text-gray-600">Location</p>
              <p className="text-gray-800 font-medium">Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-700">Preferences</h2>
          <div className="mt-4">
            <p className="text-gray-600 mb-2">Favorite Styles</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Casual
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Formal
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                Sporty
              </span>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 mb-2">Preferred Colors</p>
            <div className="flex flex-wrap gap-2">
              <span className="w-8 h-8 rounded-full bg-red-500"></span>
              <span className="w-8 h-8 rounded-full bg-blue-500"></span>
              <span className="w-8 h-8 rounded-full bg-green-500"></span>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="p-6 flex justify-end bg-gray-100">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
