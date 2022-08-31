
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from "react-native";

import Quiz from './app/screens/Quiz';

import { NavigationContainer } from "@react-navigation/native";


//import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";



const App =() =>{

return(
  <NavigationContainer theme ={navigationTheme}>
     <AuthNavigator/>
   </NavigationContainer>
);

};

export default App; 