import axiosClient from '../common/axiosClient';

const authService = {
  login: async (credentials) => {
    const response = await axiosClient.get(`/users?email=${credentials.email}`);
    console.log(response.data);
    const user = response?.data.find(u => u.email === credentials.email && u.password === credentials.password);
    console.log(user);
    if (user) {
      localStorage.setItem('token', 'isLoggedIn');
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  },
  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated: () => !!localStorage.getItem('token')
};

export default authService;