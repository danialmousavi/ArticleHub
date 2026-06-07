import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity, Text, StyleSheet, I18nManager } from "react-native";
import { useContext } from "react";

import HomeScreen from "../../screens/HomeScreen";
import ArticlesScreen from "../../screens/article/ArticlesScreen";
import ArticleDetailScreen from "../../screens/article/ArticleDetailScreen";
import LoginScreen from "../../screens/Auth/Login";
import CategoriesScreen from "../../screens/categories/CategoriesScreen";
import CategoryDetailScreen from "../../screens/categories/CategoryDetailScreen";
import Register from "../../screens/Auth/Register";

import { MainContext } from "../context/MainContext";

export type RootDrawerParamList = {
  Home: undefined;
  Articles: undefined;
  ArticleDetail: { articleId: string };
  Login: undefined;
  Logout: undefined;
  Categories: undefined;
  CategoryDetail: undefined;
  Register: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const LogoutScreen = () => {
  return null;
};

const RootDrawer = () => {
  const context = useContext(MainContext);

  const isLogin = context?.isLogin || false;
  const user = context?.user;

  const handleLogout = () => {
    context?.logoutUser()
  };

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerPosition: "right",

        headerTitleAlign: "center",

        headerTitleStyle: {
          fontFamily: "VasirBold",
        },

        headerShown: true,

        // دکمه منو
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

        // نام کاربر یا دکمه ورود
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              if (!isLogin) {
                navigation.navigate("Login");
              }
            }}
            style={styles.userButton}
          >
            <Text style={styles.userText}>
              {isLogin ?context?.user?.username || "کاربر" : "ورود"}
            </Text>
          </TouchableOpacity>
        ),

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

      <Drawer.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{
          title: "جزئیات مقاله",
          drawerLabel: () => null,
          drawerItemStyle: {
            height: 0,
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={{
          title: "مقالات دسته بندی",
          drawerLabel: () => null,
          drawerItemStyle: {
            height: 0,
            display: "none",
          },
        }}
      />

      {!isLogin ? (
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "ورود",
            drawerLabel: "🔑 ورود",
          }}
        />
      ) : (
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          listeners={{
            drawerItemPress: (e) => {
              e.preventDefault();
              handleLogout();
            },
          }}
          options={{
            title: "خروج",
            drawerLabel: "🚪 خروج",
          }}
        />
      )}

      <Drawer.Screen
        name="Register"
        component={Register}
        options={{
          title: "ثبت نام",
          drawerLabel: () => null,
          drawerItemStyle: {
            height: 0,
            display: "none",
          },
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

  userButton: {
    marginRight: 15,
    padding: 8,
  },

  userText: {
    fontSize: 14,
    fontFamily: "VasirBold",
  },
});

export default RootDrawer;