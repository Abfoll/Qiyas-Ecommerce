// In-memory user store, for demo purposes only.
// Resets whenever the dev server restarts. Swap this for a real
// database (Postgres, MongoDB, etc.) when you're ready to go to production —
// the register/login route handlers are the only places that touch this file.

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

const users: StoredUser[] = [];

export function findUserByEmail(email: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string) {
  return users.find((u) => u.id === id);
}

export function createUser(user: StoredUser) {
  users.push(user);
  return user;
}