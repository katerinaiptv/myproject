import { Text, TouchableOpacity, View } from "react-native";
import colors from "../../../../config/colors";

export const Options = ({
  onOptionPress,
  question,
  optionsDisabled,
  selected,
}) => {
  return (
    <View>
      {question.options.map((option, index) => {
        const { name } = option;
        return (
          <TouchableOpacity
            onPress={() => onOptionPress(option)}
            disabled={optionsDisabled}
            key={index}
            style={{
              borderWidth: 3,

              borderColor:
                  name == selected
                  ? colors.error
                  : colors.primary,

              backgroundColor: colors.primary,

              height: 60,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, color: colors.white, textAlign: "center" }}
            >
              {name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
