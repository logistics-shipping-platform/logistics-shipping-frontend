import api from './api';

export async function loginUser(values) {
  try {
    const response = await api.post('/auth/login', values);
    return response.data.token;
  } catch (error) {
    throw error;
  }
}


export async function signUpUser(values) {
  try {
    const response = await api.post('/auth/register', values);
    return response.data.token;
  } catch (error) {
    throw error;
  }
}