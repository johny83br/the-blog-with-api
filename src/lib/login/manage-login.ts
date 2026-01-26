import bcrypt from 'bcryptjs';
import {
  JWT_SECRET_KEY,
  LOGIN_COOKIE_NAME,
  LOGIN_EXPIRATION_SECONDS,
  LOGIN_EXPIRATION_STRING,
  LOGIN_USER,
} from '../constants';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

const jwtEncodedKey = new TextEncoder().encode(JWT_SECRET_KEY);

const loginExpSeconds = LOGIN_EXPIRATION_SECONDS;
const loginExpStr = LOGIN_EXPIRATION_STRING;
const loginCookieName = LOGIN_COOKIE_NAME;

type JwtPayload = {
  username: string;
  expires: Date;
};

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString('base64');
  return base64;
}

export async function verifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');
  return bcrypt.compare(password, hash);
}

export async function createLoginSession(username: string) {
  const expires = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJwt({ username, expires });
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expires,
  });
}

export async function createLoginSessionFromApi(jwt: string) {
  const expires = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = jwt;
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expires,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}

export async function getLoginSession() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt) return false;

  return verifyJwt(jwt);
}

export async function getLoginSessionForApi() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt) return false;

  return jwt;
}

export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();

  if (!jwtPayload) return false;

  return jwtPayload.username === LOGIN_USER;
}

export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await getLoginSession();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}

export async function requireLoginSessionForApiOrRedirect() {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    redirect('/login');
  }
}

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: 'HS256',
      typ: 'JWT',
    })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}

export async function verifyJwt(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    console.log('Token inválido');
    return false;
  }
}
