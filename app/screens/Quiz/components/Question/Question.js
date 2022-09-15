import { Text, View } from "react-native";
import colors from "../../../../config/colors";

export const Question = ({ question, index, total }) => {
  return (
    <View
      style={{
        marginVertical: 40,
      }}
    >
      {/* Question Counter */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: colors.qtext,
            fontSize: 20,
            opacity: 0.6,
            marginRight: 2,
          }}
        >
          {index + 1}
        </Text>
        <Text style={{ color: colors.qtext, fontSize: 18, opacity: 0.6 }}>
          / {total}
        </Text>
      </View>

      {/* Question */}
      <Text
        style={{
          color: colors.qtext,
          fontSize: 30,
        }}
      >
        {question}
      </Text>
    </View>
  );
};
