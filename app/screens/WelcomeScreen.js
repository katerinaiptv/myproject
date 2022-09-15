import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { useState } from "react";

import Button from "../components/Button";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

import AppText from "../components/Text";
import colors from "../config/colors";
import { Colors } from "react-native-paper";
import * as Font from "expo-font";
import { AppLoading } from "expo";

function WelcomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    NokioMedium: require("./assets/fonts/NokioMedium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

``  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.background}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require("../assets/logo-fawb-blue.png")}
          />
          <Text style={styles.tagline}>Financial Awareness and Well Being</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Start your survey"
            onPress={() => navigation.navigate("Quiz")}
          />
        </View>

        {/*<ImageBackground
             blurRadius={0}
             style={styles.background}
             source={require("../assets/ws5.jpg")}>
              </ImageBackground>
          */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  buttonsContainer: {
    padding: 40,
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
  },
  tagline: {
    fontSize: 23,
    fontWeight: "500",
    paddingVertical: 20,
    color: colors.dark,
    fontFamily: "NokioMedium",
  },
});

export default WelcomeScreen;
