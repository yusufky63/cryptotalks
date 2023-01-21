/* eslint-disable quotes */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {Image} from "react-native";
import FlashMessage from "react-native-flash-message";
import auth from "@react-native-firebase/auth";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {colors} from "./utils/style/colors";

import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import ChatRooms from "./pages/ChatRooms";
import Chat from "./pages/Chat";

const Stack = createNativeStackNavigator();

const Router = ({navigation}) => {
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUserSession(!!user);
    });
  }, []);

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="WelcomeScreen" component={Welcome} />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="RegisterScreen" component={Register} />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!userSession ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : (
          <>
            <Stack.Screen
              name="ChatRoomsScreen"
              options={{
                headerShown: true,
                title: "Sohbet Odaları",
                headerTitleAlign: "center",
                headerTintColor: colors.secondary,
                headerRight: () => (
                  <Icon
                    name="logout"
                    color={colors.secondary}
                    size={28}
                    onPress={() => auth().signOut()}
                  />
                ),
                headerLeft: () => (
                  <Image
                    source={{uri: auth().currentUser.photoURL}}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      marginLeft: -10,
                      borderWidth: 3,
                      borderColor: "#fff",
                    }}
                  />
                ),
              }}
              component={ChatRooms}
            />
          </>
        )}
        <Stack.Screen
          name="ChatScreen"
          options={{headerShown: true}}
          component={Chat}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;