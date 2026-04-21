import { randomBytes, scryptSync } from "node:crypto";

const PASSWORD_HASH_PREFIX = "scrypt";
const PASSWORD_HASH_KEY_LENGTH = 64;
const PASSWORD_HASH_N = 16384;
const PASSWORD_HASH_R = 8;
const PASSWORD_HASH_P = 1;

const password = process.argv[2] ?? "";

if (!password) {
  console.error("Usage: node scripts/hash-admin-password.mjs <password>");
  process.exit(1);
}

const salt = randomBytes(16).toString("base64url");
const derivedKey = scryptSync(password, salt, PASSWORD_HASH_KEY_LENGTH, {
  N: PASSWORD_HASH_N,
  r: PASSWORD_HASH_R,
  p: PASSWORD_HASH_P,
}).toString("base64url");

process.stdout.write(
  [
    PASSWORD_HASH_PREFIX,
    PASSWORD_HASH_N,
    PASSWORD_HASH_R,
    PASSWORD_HASH_P,
    salt,
    derivedKey,
  ].join("$") + "\n",
);
