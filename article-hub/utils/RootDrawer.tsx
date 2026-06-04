// utils/RootDrawer.tsx
import HomeScreen from "../screens/HomeScreen";
import ArticlesScreen from "../screens/ArticlesScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type RootDrawerParamList = {
  خانه: undefined;
  مقالات: undefined;
};

const RootDrawer = () => {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerPosition: 'right',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontFamily: 'VasirBold', // اضافه شد - فونت تایتل هدر
        },
        headerLeft: () => null,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        ),
        drawerLabelStyle: {
          textAlign: 'right',
          writingDirection: 'rtl',
          fontSize: 16,
          fontFamily:"VasirBold"
        },
    
      })}
    >
      <Drawer.Screen name="خانه" component={HomeScreen} />
      <Drawer.Screen name="مقالات" component={ArticlesScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 15,
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
  },
});

export default RootDrawer;