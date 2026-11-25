import { isAndroid } from '@nativescript/core';

// Escribe la URL HTTPS de ngrok para probar en teléfonos físicos o iOS.
export const NGROK_BASE_URL = '';

export const API_BASE_URL = NGROK_BASE_URL.trim().replace(/\/+$/, '')
  || (isAndroid ? 'http://10.0.2.2:3000' : '');
