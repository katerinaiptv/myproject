import { Text, TouchableOpacity } from "react-native";
import colors from "../../../../config/colors";

export const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 20,
        width: "100%",
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 25,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: colors.white,
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        Next
      </Text>
    </TouchableOpacity>
  );
};
