import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import  Quiz from "../screens/Quiz";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    
    <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }}/>
    <Stack.Screen name="Login" component={RegisterScreen} options={{ headerShown: false }}/>
  </Stack.Navigator>
);

export default AuthNavigator;
