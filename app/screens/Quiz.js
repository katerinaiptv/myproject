import { useCallback, useMemo, useReducer } from "react";
import {
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";
import { QUESTIONS } from "../config/questions";
import { NextButton } from "./Quiz/components/NextButton/NextButton";
import { Options } from "./Quiz/components/Options/Options";
import { Progress } from "./Quiz/components/Progress/Progress";
import { Question } from "./Quiz/components/Question/Question";
import { Result } from "./Quiz/components/Result/Result";

const DEFAULT_STATE = {
  questionIndex: 0,
  optionSelected: null,
  optionsDisabled: false,
  score: 0,
  showNext: false,
  showModal: false,
  answers: [],
};

const totalScore = QUESTIONS.reduce((sum, next) => {
  return (
    sum +
    next.options.reduce((max, { value }) => {
      return Math.max(value, max);
    }, 0)
  );
}, 0);

const Actions = Object.freeze({
  SET_SELECTED: Symbol("SET_SELECTED"),
  SET_DISABLED: Symbol("SET_DISABLED"),
  SHOW_NEXT: Symbol("SHOW_NEXT"),
  NEXT: Symbol("NEXT"),
  RESTART: Symbol("RESTART"),
});

const reducer = (state, action) => {
  const { type, payload } = action;
  console.log(action, state);
  switch (type) {
    case Actions.SET_SELECTED: {
      return {
        ...state,
        optionSelected: payload,
      };
    }
    case Actions.SET_DISABLED: {
      return {
        ...state,
        optionsDisabled: payload,
      };
    }
    case Actions.SHOW_NEXT: {
      return {
        ...state,
        showNext: payload,
      };
    }
    case Actions.NEXT: {
      const questionIndex = state.questionIndex + 1;
      if (questionIndex >= QUESTIONS.length) {
        return {
          ...state,
          questionIndex,
          showModal: true,
        };
      }
      const answers = [...state.answers, state.optionSelected];

      return {
        ...state,
        questionIndex,
        optionSelected: null,
        optionsDisabled: false,
        showNext: false,
        answers,
      };
    }
    case Actions.RESTART: {
      return {
        ...DEFAULT_STATE,
      };
    }
  }
  return state;
};

const Quiz = () => {
  const [
    {
      questionIndex,
      optionSelected,
      optionsDisabled,
      showNext,
      answers,
      showModal,
    },
    dispatch,
  ] = useReducer(reducer, { ...DEFAULT_STATE });

  const total = QUESTIONS.length;

  const validateAnswer = useCallback(
    (selectedOption) => {
      dispatch({ type: Actions.SET_SELECTED, payload: selectedOption.name });
      dispatch({ type: Actions.SET_DISABLED, payload: true });
      dispatch({ type: Actions.SHOW_NEXT, payload: true });
    },
    [dispatch]
  );

  const handleNext = useCallback(() => {
    dispatch({ type: Actions.NEXT });
  }, []);

  const restartQuiz = useCallback(() => {
    dispatch({ type: Actions.RESTART });
  }, []);

  const score = answers.reduce((sum, next, index) => {
    const question = QUESTIONS[index];
    const selected =
      question?.options?.find((answer) => answer.name === next)?.value || 0;
    return sum + selected;
  }, 0);

  console.log(score);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View
        style={{
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: 16,
          backgroundColor: colors.background,
          position: "relative",
        }}
      >
        {/* ProgressBar*/}
        <Progress position={questionIndex} total={total} />

        {/* Question*/}
        {!showModal && (
          <Question
            question={QUESTIONS[questionIndex]?.question}
            total={total}
            index={questionIndex}
          />
        )}

        {/* Options*/}
        {!showModal && (
          <Options
            question={QUESTIONS[questionIndex]}
            optionsDisabled={optionsDisabled}
            onOptionPress={validateAnswer}
            selected={optionSelected}
          />
        )}

        {/* Next Button*/}
        {showNext && <NextButton onPress={handleNext} />}

        {/*Score Modal */}
        {showModal && (
          <Result
            restartQuiz={restartQuiz}
            total={total}
            totalScore={totalScore}
            score={score}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Quiz;
