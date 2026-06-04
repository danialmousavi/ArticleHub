// screens/LoginScreen.tsx
import { View, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import RTLText from '../../components/RTLText';
import RTLTextInput from '../../components/RTLTextInput';

type FormData = {
  username: string;
  password: string;
};

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Login data:', data);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* لوگو و هدر */}
        <View style={styles.header}>
      
          <RTLText style={styles.welcomeText}>خوش آمدید</RTLText>
          <RTLText style={styles.subtitle}>
            برای ورود لطفاً اطلاعات خود را وارد کنید
          </RTLText>
        </View>

        {/* فرم */}
        <View style={styles.form}>
          {/* فیلد ایمیل */}
          <View style={styles.inputGroup}>
            <RTLText style={styles.label}>نام کاربری</RTLText>
            <Controller
              control={control}
              name="username"
              rules={{
                required: 'ایمیل الزامی است',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputWrapper,
                    errors.username && styles.inputWrapperError,
                  ]}
                >
                  <RTLTextInput
                    style={styles.input}
                    placeholder="username"
                    placeholderTextColor="#999"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              )}
            />
            {errors.username && (
              <RTLText style={styles.errorText}>{errors.username.message}</RTLText>
            )}
          </View>

          {/* فیلد رمز عبور */}
          <View style={styles.inputGroup}>
            <RTLText style={styles.label}>رمز عبور</RTLText>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'رمز عبور الزامی است',
                minLength: {
                  value: 6,
                  message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputWrapper,
                    errors.password && styles.inputWrapperError,
                  ]}
                >
                  <RTLTextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="••••••"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <RTLText style={styles.eyeIcon}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </RTLText>
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <RTLText style={styles.errorText}>{errors.password.message}</RTLText>
            )}
          </View>

          {/* دکمه ورود */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <RTLText style={styles.loginButtonText}>ورود</RTLText>
            )}
          </TouchableOpacity>

          {/* جداکننده */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <RTLText style={styles.dividerText}>یا</RTLText>
            <View style={styles.dividerLine} />
          </View>

         

          {/* ثبت نام */}
          <View style={styles.registerContainer}>
            <RTLText style={styles.registerText}>حساب کاربری ندارید؟</RTLText>
            <TouchableOpacity>
              <RTLText style={styles.registerLink}> ثبت نام کنید</RTLText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 45,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: 'VasirBold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Vasir',
    color: '#666',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Vasir',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  inputWrapperError: {
    borderColor: '#ff3b30',
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Vasir',
    color: '#333',
  },
  passwordInput: {
    flex: 1,
  },
  eyeButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  eyeIcon: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Vasir',
    color: '#ff3b30',
    marginTop: 6,
  },
  forgotButton: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 13,
    fontFamily: 'Vasir',
    color: '#007AFF',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'VasirBold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 12,
    fontFamily: 'Vasir',
    color: '#999',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  socialIcon: {
    fontSize: 20,
  },
  socialText: {
    fontSize: 14,
    fontFamily: 'Vasir',
    color: '#333',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'Vasir',
    color: '#666',
  },
  registerLink: {
    fontSize: 14,
    fontFamily: 'VasirBold',
    color: '#007AFF',
  },
});

export default LoginScreen;