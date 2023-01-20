/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {Image} from "react-native";
import FlashMessage from "react-native-flash-message";
import auth from "@react-native-firebase/auth";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {colors} from "./utils/style/colors";
import "react-native-gesture-handler";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import ChatRooms from "./pages/ChatRooms";
import Chat from "./pages/Chat";
import CustomSidebarMenu from "./pages/Auth/DrawerExitButton";
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Router = () => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
    });
  }, []);

  const AuthStack = ({navigation}) => {
    return (
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen name="WelcomeScreen" component={Welcome} />
        <Drawer.Screen name="LoginScreen" component={Login} />
        <Drawer.Screen name="RegisterScreen" component={Register} />
      </Drawer.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        {!userSession ? (
          <Drawer.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <>
            <Drawer.Screen
              name="Profile"
              component={CustomSidebarMenu}
              options={{
                header: () => (
                  <Icon.Button
                    name="menu"
                    size={25}
                    backgroundColor={colors.primary}
                    onPress={() => {}}
                  />
                ),

                headerShown: false,
                title: "Profil",
                headerTitleAlign: "center",

                headerTintColor: colors.secondary,
              }}
            />
            <Drawer.Screen
              name="ChatRoomsScreen"
              options={{
                headerShown: true,
                title: "Sohbet Odaları",
                headerTitleAlign: "center",
                headerTintColor: colors.secondary,
              }}
              component={ChatRooms}
            />
            <Drawer.Screen
              name="ChatScreen"
              options={{headerShown: false}}
              component={Chat}
            />
            <Drawer.Screen
              name="Exit"
              component={CustomSidebarMenu}
              options={{
                headerShown: false,
                title: "Çıkış Yap",
                headerTitleAlign: "center",

                headerTintColor: colors.secondary,
              }}
            />
          </>
        )}
      </Drawer.Navigator>

      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
