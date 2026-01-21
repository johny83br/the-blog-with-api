export const SIMULATE_WAIT_IN_MS = Number(process.env.SIMULATE_WAIT_IN_MS) || 0;

export const IMAGE_UPLOAD_MAX_SIZE =
  Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;

export const IMAGE_UPLOAD_DIRECTORY =
  process.env.NEXT_PUBLIC_IMAGE_UPLOAD_DIRECTORY || 'uploads';

export const IMAGE_SERVER_URL =
  process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
