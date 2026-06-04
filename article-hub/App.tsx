import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, I18nManager } from 'react-native';
import RootDrawer from './utils/RootDrawer';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }, 100);
  }, []);

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