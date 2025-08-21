import { LoginResponse } from '@/types/loginResponse';
import { apiFetch } from '../api';

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    credentials: 'include', // allow cookies to be sent/received
  });

  return res;
}

export async function signup(
  name: string,
  email: string,
  password: string,
  organizationName: string,
) {
  const res = await apiFetch('/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, organizationName }),
    credentials: 'include', // allow cookies to be sent/received
  });

  return res;
}

export async function logout() {
  const res = await apiFetch('/session/logout', {
    method: 'POST',
  });
}
