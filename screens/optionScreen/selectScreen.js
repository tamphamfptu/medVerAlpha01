import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useIsValidQuiz } from "../../hooks/question.hook";
import { useIsFavoriteExisted } from "../../hooks/favorite.hook";
import { Ionicons } from "@expo/vector-icons";
import { Navigate } from "../../constants/navigate";

const OptionScreen = ({ navigation }) => {
  let isQuestionValid;
  let isFavoriteExisted;
  const {
    data: dataIsValidQuiz,
    isSuccess: successIsValidQuiz,
    isError: isErrorIsValidQuiz,
    error: errorIsValidQuiz,
  } = useIsValidQuiz();

  const {
    data: dataIsFavoriteExisted,
    isSuccess: successIsFavoriteExisted,
    isError: isErrorIsFavoriteExisted,
    error: errorIsFavoriteExisted,
  } = useIsFavoriteExisted();

  if (isErrorIsFavoriteExisted) {
    console.log("error", errorIsFavoriteExisted);
  }

  if (isErrorIsValidQuiz) {
    console.log("Checking Valid Quiz failed", errorIsValidQuiz);
  }
  if (successIsFavoriteExisted) {
    isFavoriteExisted = dataIsFavoriteExisted.exists;
  }
  if (successIsValidQuiz) {
    isQuestionValid = dataIsValidQuiz;
  }
  useEffect(() => {
    if (isQuestionValid !== null && isFavoriteExisted !== null) {
      isQuestionValid = null;
      isFavoriteExisted = null;
    }
    if (isQuestionValid === null && isFavoriteExisted === null) {
      if (successIsFavoriteExisted) {
        isFavoriteExisted = dataIsFavoriteExisted.exists;
      }
      if (successIsValidQuiz) {
        isQuestionValid = dataIsValidQuiz;
      }
    }
    validate();
  }, [isQuestionValid, isFavoriteExisted]);

  const validate = () => {
    if (isQuestionValid === true && isFavoriteExisted === true) {
      navigation.push(Navigate.BOTTOM_TAB_BAR);
    } else if (isQuestionValid === false && isFavoriteExisted === true) {
      navigation.push(Navigate.QUIZ);
    } else if (isQuestionValid === true && isFavoriteExisted === false) {
      navigation.push(Navigate.CHOOSE_MUSIC);
    } else if (isQuestionValid === false && isFavoriteExisted === false) {
      navigation.push(Navigate.QUIZ);
    }
  };

  function signupInfo() {
    return (
      <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
        <MaskedView
          style={{ flex: 1, height: 35 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.bold30 }}>
              Let’s find out yourself
            </Text>
          }
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        {skip()}
      </View>
    );
  }

  function skip() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Ionicons
          onPress={() => {
            navigation.navigate("BottomTabBar");
          }}
          name="arrow-forward"
          size={28}
          color="black"
        />
        <Text style={{ ...Fonts.blackColor16Bold, marginTop: 5 }}>Skip</Text>
      </View>
    );
  }

  function QuizButton() {
    return (
      <TouchableOpacity
        style={styles.signupButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          validate();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.signupButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Take quiz</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
  function CamButton() {
    return (
      <TouchableOpacity
        style={styles.signupButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          navigation.push(Navigate.SHOW_CAM);
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.signupButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Show Cam</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function cornerImage() {
    return (
      <View>
        <Image
          source={require("../../assets/images/corner-design.png")}
          style={{
            width: "100%",
            height: 170,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {cornerImage()}
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            {signupInfo()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginBottom: Sizes.fixPadding + 10.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  passwordTextFieldWrapstyle: {
    marginBottom: Sizes.fixPadding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    paddingVertical: Sizes.fixPadding + 1.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  orWrapStyle: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Sizes.fixPadding + 5.0,
    marginBottom: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  socialMediaIconsStyle: {
    width: 32.0,
    height: 32.0,
    borderRadius: 16.0,
    alignItems: "center",
    justifyContent: "center",
  },
  socialMediaIconsWrapStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  signupButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signupButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

export default OptionScreen;
