// utils/RootDrawer.tsx
import HomeScreen from "../screens/HomeScreen";
import ArticlesScreen from "../screens/ArticlesScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text, StyleSheet, I18nManager } from "react-native";
import LoginScreen from "../screens/Auth/Login";

type RootDrawerParamList = {
  Home: undefined;
  Articles: undefined;
  Login: undefined;
};

const RootDrawer = () => {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerPosition: "right",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "VasirBold",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={[
              styles.menuButton,
              I18nManager.isRTL && styles.menuButtonRTL,
            ]}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        ),
        headerRight: () => null,
        drawerLabelStyle: {
          textAlign: "right",
          fontSize: 16,
          fontFamily: "VasirBold",
        },
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{
        title:"خانه"
      }} />
      <Drawer.Screen name="Articles" component={ArticlesScreen} options={{
        title:"مقالات"
      }} />
      <Drawer.Screen name="Login" component={LoginScreen} options={{
        title:"ورود"
      }}/>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 15,
    padding: 8,
  },
  menuButtonRTL: {
    marginLeft: 0,
    marginRight: 15,
  },
  menuIcon: {
    fontSize: 24,
  },
});

export default RootDrawer;
