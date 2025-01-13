
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/header/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './admin/components/PrivateRoute';
import Dashboard from './admin/pages/Dashboard';

function App() {
 

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/admin/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
