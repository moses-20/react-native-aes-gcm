import AesGcm from './AesGcm';

export async function encrypt(data: string, secret: string): Promise<string> {
  try {
    return await AesGcm.encrypt(data, secret);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function decrypt(data: string, secret: string): Promise<string> {
  try {
    return await AesGcm.decrypt(data, secret);
  } catch (e) {
    return Promise.reject(e);
  }
}
