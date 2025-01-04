import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username , password);
      setAuth(username, password);
      alert('Kayıt başarılı!'); 
      navigate('/login'); 
    } catch (error) {
      alert('Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.'); 
      console.error('Kayıt başarısız:', error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-2xl font-bold mb-4 text-center">Kayıt Ol</h2>
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
        Kayıt Ol
      </button>
    </form>
  </div>
  )
}

export default RegisterPage
