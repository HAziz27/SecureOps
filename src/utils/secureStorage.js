import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_ENCRYPTION_KEY || 'secure-ops-dev-key-2026';

export const saveSecureData = (storageKey, data) => {
  try {
    const jsonString = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
    localStorage.setItem(storageKey, encryptedData);
  } catch (error) {
    console.error('Data encryption failed:', error);
  }
};

export const loadSecureData = (storageKey) => {
  try {
    const encryptedData = localStorage.getItem(storageKey);
    if (!encryptedData) return null;
    
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Data decryption failed:', error);
    return null;
  }
};