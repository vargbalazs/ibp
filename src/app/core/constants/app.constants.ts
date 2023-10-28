import { HttpContextToken } from '@angular/common/http';

export const API_URL = 'https://ibp.onrender.com';
export const USE_LOADING_SPINNER = new HttpContextToken<boolean>(() => true);
