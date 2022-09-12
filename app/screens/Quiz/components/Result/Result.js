import { Modal, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../../config/colors";

export const Result = ({ restartQuiz, total, totalScore, score }) => (
  <Modal animationType="slide" transparent={true} visible={true}>
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: colors.white,
          width: "90%",
          borderRadius: 20,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
          {score > totalScore / 2 ? "Congratulations!" : "Oops!"}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: score > totalScore / 2 ? colors.success : colors.error,
            }}
          >
            {score}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colors.black,
            }}
          >
            / {totalScore}
          </Text>
        </View>
        {/* Retry Quiz button */}
        <TouchableOpacity
          onPress={restartQuiz}
          style={{
            backgroundColor: colors.secondary,
            padding: 20,
            width: "100%",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: colors.white,
              fontSize: 20,
            }}
          >
            Retry Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
