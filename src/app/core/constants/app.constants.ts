import { HttpContextToken } from '@angular/common/http';

export const API_URL = 'http://localhost:3000'; //'https://ibp.onrender.com';
export const USE_LOADING_SPINNER = new HttpContextToken<boolean>(() => true);
