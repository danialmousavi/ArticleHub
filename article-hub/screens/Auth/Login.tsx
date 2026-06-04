// screens/LoginScreen.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
};

const LoginScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* هدر */}
        <View style={styles.header}>
          <Text style={styles.title}>خوش آمدید</Text>
          <Text style={styles.subtitle}>لطفاً وارد حساب کاربری خود شوید</Text>
        </View>

        {/* فرم */}
        <View style={styles.form}>
          
          {/* فیلد نام کاربری */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>نام کاربری</Text>
            <Controller
              control={control}
              name="username"
              rules={{ required: 'نام کاربری الزامی است' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.username && styles.inputError]}
                  placeholder="نام کاربری خود را وارد کنید"
                  placeholderTextColor="#999"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}
          </View>

          {/* فیلد رمز عبور */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>رمز عبور</Text>
            <Controller
              control={control}
              name="password"
              rules={{ 
                required: 'رمز عبور الزامی است',
                minLength: { value: 6, message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="رمز عبور خود را وارد کنید"
                  placeholderTextColor="#999"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          {/* دکمه ورود */}
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>ورود</Text>
          </TouchableOpacity>

          {/* لینک ثبت نام */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>حساب کاربری ندارید؟</Text>
            <TouchableOpacity onPress={() => console.log('Go to register')}>
              <Text style={styles.registerLink}> ثبت نام کنید</Text>
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
  title: {
    fontSize: 28,
    fontFamily: 'VasirBold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Vasir',
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Vasir',
    color: '#333',
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Vasir',
    backgroundColor: '#f9f9f9',
    textAlign: 'right',
  },
  inputError: {
    borderColor: '#ff3b30',
    borderWidth: 1.5,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Vasir',
    color: '#ff3b30',
    marginTop: 6,
    marginRight: 4,
    textAlign: 'right',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'VasirBold',
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
    textAlign: 'center',
  },
  registerLink: {
    fontSize: 14,
    fontFamily: 'VasirBold',
    color: '#007AFF',
  },
});

export default LoginScreen;