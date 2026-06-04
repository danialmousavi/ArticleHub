// screens/HomeScreen.tsx
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';

type RootDrawerParamList = {
  خانه: undefined;
  مقالات: undefined;
};

type HomeScreenProps = DrawerScreenProps<RootDrawerParamList, 'خانه'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          به اپلیکیشن فارسی خوش آمدید
        </Text>
        
        <Text style={styles.text}>
          این اپلیکیشن کاملاً برای زبان فارسی راست‌چین شده است. 
          منوی کشویی از راست صفحه باز میشود و تمام محتوا به صورت راست‌چین نمایش داده میشود.
        </Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>نمونه کارت</Text>
          <Text style={styles.cardText}>
            این یک کارت نمونه است که محتوای آن راست‌چین میباشد.
          </Text>
        </View>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>کلیک کنید</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily:"VasirBold",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily:"Vasir"

  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'right',
    writingDirection: 'rtl',
     fontFamily:"VasirBold",

  },
  cardText: {
    fontSize: 14,
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily:"Vasir"

  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;