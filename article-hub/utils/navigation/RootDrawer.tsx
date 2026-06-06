// src/navigation/RootDrawer.tsx
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text, StyleSheet, I18nManager } from "react-native";
import HomeScreen from "../../screens/HomeScreen";
import ArticlesScreen from "../../screens/article/ArticlesScreen";
import ArticleDetailScreen from "../../screens/article/ArticleDetailScreen";
import LoginScreen from "../../screens/Auth/Login";
import CategoriesScreen from "../../screens/categories/CategoriesScreen";

export type RootDrawerParamList = {
  Home: undefined;
  Articles: undefined;
  ArticleDetail: { articleId: string };  // اضافه شد
  Login: undefined;
  Categories:undefined
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
        headerShown: true,
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
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: "خانه",
          drawerLabel: "🏠 خانه",
        }} 
      />
      
      <Drawer.Screen 
        name="Articles" 
        component={ArticlesScreen}
        options={{
          title: "مقالات",
          drawerLabel: "📖 مقالات",
        }} 
      />
      <Drawer.Screen 
        name="Categories" 
        component={CategoriesScreen}
        options={{
          title: "دسته بندی ها",
          drawerLabel: "🧙🏻‍♂️ دسته بندی ها",
        }} 
      />
      {/* صفحه جزئیات مقاله - مخفی از منو 🔥 */}
      <Drawer.Screen 
        name="ArticleDetail" 
        component={ArticleDetailScreen}
        options={{
          title: "جزئیات مقاله",
          drawerLabel: () => null,  // مخفی کردن از منو
          drawerItemStyle: { height: 0, display: 'none' },  // کاملاً مخفی
        }} 
      />
      
      <Drawer.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{
          title: "ورود",
          drawerLabel: "🔑 ورود",
        }}
      />
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