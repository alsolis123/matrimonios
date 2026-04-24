import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 8;

function readAdminPin(): string {
  const pin = process.env.ADMIN_PIN?.trim();

  if (!pin) {
    throw new Error("Missing ADMIN_PIN environment variable.");
  }

  return pin;
}

function createSignature(payload: string, pin: string) {
  return createHmac("sha256", pin).update(payload).digest("hex");
}

export function isValidAdminPin(candidate: string) {
  const pin = readAdminPin();
  const normalizedCandidate = candidate.trim();

  const candidateBuffer = Buffer.from(normalizedCandidate);
  const pinBuffer = Buffer.from(pin);

  if (candidateBuffer.length !== pinBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateBuffer, pinBuffer);
}

export function createAdminSessionValue() {
  const pin = readAdminPin();
  const expiresAt = Date.now() + ADMIN_SESSION_DURATION_SECONDS * 1000;
  const payload = `${expiresAt}`;
  const signature = createSignature(payload, pin);

  return `${payload}.${signature}`;
}

export function isAdminSessionValueValid(value: string | undefined) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return false;
  }

  const pin = readAdminPin();
  const expectedSignature = createSignature(payload, pin);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return false;
  }

  const expiresAt = Number(payload);

  if (!Number.isFinite(expiresAt)) {
    return false;
  }

  return expiresAt > Date.now();
}

export function getAdminSessionDurationSeconds() {
  return ADMIN_SESSION_DURATION_SECONDS;
}
