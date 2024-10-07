import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  First_Name: string;
  Last_Name: string;
  Email: string;
  iat: number;
  exp: number;
}

export const setAuthToken = (token: string) => {
  Cookies.set('authToken', token);
};

export const getAuthToken = () => {
  return Cookies.get('authToken');
};

export const removeAuthToken = () => {
  Cookies.remove('authToken');
};

export const isTokenExpired = () => {
  const token = getAuthToken();
  if (!token) return true;

  const decodedToken = jwtDecode(token) as DecodedToken;
  return decodedToken.exp * 1000 < Date.now();
};