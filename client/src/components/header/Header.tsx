import { Link } from "react-router-dom"
import { useAuthStore } from "../../stores/useAuthStore";

const Header = () => {
  const { isLoggedIn, username, logout } = useAuthStore();


  const handleLogout = () => {
    logout(); 
  };
  
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div className="text-lg font-bold">
      <Link to="/">Logo</Link>
    </div>
    <nav className="space-x-4">
      {isLoggedIn ? (
        <>
          <span>{username}</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Çıkış Yap</button>
        </>
      ) : (
        <>
          <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">Giriş Yap</Link>
          <Link to="/register" className="bg-green-500 px-3 py-1 rounded">Kayıt Ol</Link>
        </>
      )}
    </nav>
  </header>
  )
}

export default Header
