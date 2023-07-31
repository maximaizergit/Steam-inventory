export const isUserAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken;
};

export const handleSuccessfulAuth = (token: string) => {
  // Сохраняем токен в localStorage
  localStorage.setItem('accessToken', token);

   window.location.href = '/home'; // Замените '/dashboard' на нужный URL
};

