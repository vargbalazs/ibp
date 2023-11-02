import { HttpContextToken } from '@angular/common/http';

export const API_URL = 'https://ibp.onrender.com';
export const USE_LOADING_SPINNER = new HttpContextToken<boolean>(() => true);
export const PUBLIC_URLS = [
  '/auth/login',
  '/auth/forgotpwd',
  '/users/username-exists',
  '/users/useremail-exists',
];
