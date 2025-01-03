import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
       <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">Logo</Link>
      </div>
      <nav className="space-x-4">
        <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">Giriş Yap</Link>
        <Link to="/register" className="bg-green-500 px-3 py-1 rounded">Kayıt Ol</Link>
      </nav>
    </header>
    </div>
  )
}

export default Header
