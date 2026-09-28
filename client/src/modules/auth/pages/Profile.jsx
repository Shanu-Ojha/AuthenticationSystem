/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useAuthContext } from "../context/authProvider";
import useAPI from "../../shared/useAPI";

const Profile = () => {
  const { user, setUser } = useAuthContext();
  const api = useAPI();

  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data.user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8fb] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-100 overflow-hidden">

          {/* Header */}
          <div className="h-32 bg-linear-to-br from-pink-400 via-rose-400 to-pink-500 relative">

            {/* Decorative circles */}
            <div className="absolute w-24 h-24 bg-white/10 rounded-full -top-8 -right-6"></div>
            <div className="absolute w-20 h-20 bg-white/10 rounded-full -bottom-8.75 -left-5"></div>

          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-14 relative">
            <div className="w-28 h-28 rounded-full bg-white p-2 shadow-lg">
              <div className="w-full h-full rounded-full bg-linear-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-4xl font-bold">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="px-7 pb-8 pt-5 text-center">

            <h1 className="text-2xl font-bold text-gray-800">
              {user?.username || "Loading..."}
            </h1>

            <p className="text-gray-500 mt-1">
              {user?.email || "Loading..."}
            </p>

            {/* Divider */}
            <div className="h-px bg-gray-100 my-7"></div>

            {/* Details */}
            <div className="space-y-4 text-left">

              {/* Username */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-pink-50">
                <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500">
                  👤
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Username
                  </p>
                  <p className="font-semibold text-gray-700">
                    {user?.username || "-"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-rose-50">
                <div className="w-11 h-11 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500">
                  ✉️
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Email
                  </p>
                  <p className="font-semibold text-gray-700 truncate">
                    {user?.email || "-"}
                  </p>
                </div>
              </div>

            </div>

            {/* Status */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-green-600">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              Account Active
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;