export const SIMULATE_WAIT_IN_MS = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export const IMAGE_UPLOAD_MAX_SIZE =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

export const IMAGE_UPLOAD_DIRECTORY =
  process.env.NEXT_PUBLIC_IMAGE_UPLOAD_DIRECTORY || 'uploads';

export const IMAGE_SERVER_URL =
  process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

export const LOGIN_USER = process.env.LOGIN_USER || 'SEU_USUARIO_AQUI';

export const LOGIN_PASS = process.env.LOGIN_PASS || 'SEU_HASH_DE_SENHA_AQUI';

export const JWT_SECRET_KEY =
  process.env.JWT_SECRET_KEY || 'SUA_SECRET_KEY_AQUI';

export const LOGIN_EXPIRATION_SECONDS = Number(process.env.LOGIN_PASS) || 86400;

export const LOGIN_EXPIRATION_STRING =
  process.env.LOGIN_EXPIRATION_STRING || '1d';

export const LOGIN_COOKIE_NAME =
  process.env.LOGIN_COOKIE_NAME || 'loginSession';

export const ALLOW_LOGIN = Boolean(Number(process.env.ALLOW_LOGIN)) || false;
