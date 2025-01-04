import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      alert('Giriş başarılı');
      navigate('/');
    } catch (error) {
      alert('Giriş başarısız');
      console.error('Giriş başarısız:', error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Giriş Yap
      </button>
    </form>
    </div>
  );
};

export default LoginPage;
