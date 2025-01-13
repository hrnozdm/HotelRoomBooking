import api from '../api/api';

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', { username, password });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.user.username);
    localStorage.setItem('role',response.data.user.role);
    //console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await api.post('/register', { username, password });
    //console.log('Kayıt response kullanıcı:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Kayıt hatası:', error);
    throw error; 
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  
};


