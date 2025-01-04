import api from '../api/api';

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', { username, password });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.user.username);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/register', { username, password });
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


