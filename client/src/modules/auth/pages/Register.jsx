import { useState } from "react";
import useAPI from "../../shared/useAPI";
import { useAuthContext } from "../context/authProvider";
import { useNavigate } from 'react-router'

const Register = () => {
  const api = useAPI();
  const navigate = useNavigate()
  const { setUser, setAccessToken } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    console.log("SUCCESS:", response.data);

    setAccessToken(response.data.data.accessToken);
    setUser(response.data.data.user)
    navigate('/profile')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-rose-300 via-pink-200 to-white px-4">
      <div className="w-full max-w-md rounded-3xl border border-rose-500 bg-white/90 p-8 shadow-[0_20px_60px_rgba(244,114,182,0.15)] backdrop-blur-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Create Account
          </h1>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-rose-200 bg-rose-50/40 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100"
            />
          </div>
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-rose-100 bg-rose-50/40 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100"
            />
          </div>
          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-rose-100 bg-rose-50/40 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:bg-white focus:ring-4 focus:ring-rose-100"
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-rose-500 py-3.5 font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-600 hover:shadow-rose-300 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
