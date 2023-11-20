import { HttpContextToken } from '@angular/common/http';
import { NotificationFormat } from '../types/notification-format.type';

export const API_URL = 'https://ibp.onrender.com';
export const USE_LOADING_SPINNER = new HttpContextToken<boolean>(() => true);
export const NOTIFICATION_FORMAT_TYPE =
  new HttpContextToken<NotificationFormat>(() => 'normal');
export const NOTIFICATION_CONTAINER = new HttpContextToken<any>(() => null);
export const PUBLIC_URLS = [
  '/auth/login',
  '/auth/forgotpwd',
  '/auth/refresh',
  '/users/signup',
  '/users/username-exists',
  '/users/useremail-exists',
];
