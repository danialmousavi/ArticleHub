// src/utils/secureStorage.ts
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

// ذخیره توکن (بعد از لاگین موفق)
export const saveToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log('توکن با موفقیت ذخیره شد');
  } catch (error) {
    console.error('خطا در ذخیره توکن:', error);
    throw error;
  }
};

// دریافت توکن (برای بررسی احراز هویت)
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error('خطا در دریافت توکن:', error);
    return null;
  }
};

// حذف توکن (در زمان خروج از حساب کاربری)
export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log('توکن با موفقیت حذف شد');
  } catch (error) {
    console.error('خطا در حذف توکن:', error);
    throw error;
  }
};