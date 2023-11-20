import { HttpContextToken } from '@angular/common/http';
import { CustomNotification } from '../interfaces/custom-notification.interface';

export const API_URL = 'https://ibp.onrender.com';
export const USE_LOADING_SPINNER = new HttpContextToken<boolean>(() => true);
export const NOTIFICATION_TYPE = new HttpContextToken<CustomNotification>(
  () => <CustomNotification>{ type: 'normal', container: null }
);
export const PUBLIC_URLS = [
  '/auth/login',
  '/auth/forgotpwd',
  '/auth/refresh',
  '/users/signup',
  '/users/username-exists',
  '/users/useremail-exists',
];
