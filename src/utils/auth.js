export const setAuthData = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('sso_token', data.sso_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('user', JSON.stringify(data.member));
};

export const getAuthData = () => {
  return {
    token: localStorage.getItem('token'),
    ssoToken: localStorage.getItem('sso_token'),
    refreshToken: localStorage.getItem('refresh_token'),
    user: JSON.parse(localStorage.getItem('user') || '{}')
  };
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('sso_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}; 