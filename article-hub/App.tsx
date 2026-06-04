import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, I18nManager } from 'react-native';
import RootDrawer from './utils/RootDrawer';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Vasir': require('./assets/fonts/Vazir.ttf'),
    'VasirBold': require('./assets/fonts/Vazir-Bold.ttf'),
  });

  useEffect(() => {
    // فعال کردن RTL
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <RootDrawer />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});