import { Animated, View } from "react-native";
import { useRef, useEffect, useState } from "react";
import colors from "../../../../config/colors";

export const Progress = ({ position, total }) => {
  const progress = useRef(new Animated.Value(0));
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    Animated.timing(progress.current, {
      toValue: position,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [position, progress.current]);

  useEffect(() => {
    setWidth(
      progress.current.interpolate({
        inputRange: [0, total],
        outputRange: ["0%", "100%"],
      })
    );
  }, [setWidth, total, progress.current]);

  return (
    <View
      style={{
        width: "100%",
        height: 20,
        borderRadius: 20,
        backgroundColor: "#00000020",
      }}
    >
      <Animated.View
        style={[
          {
            height: 20,
            borderRadius: 20,
            backgroundColor: colors.secondary,
          },
          {
            width,
          },
        ]}
      ></Animated.View>
    </View>
  );
};
