import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { store } from "../../core/store/store";
import { Navigate } from "../../constants/navigate";
import { ProgressBar } from "react-native-paper";
import { generateColor } from "../../utils/app.util";
const CamResultScreen = ({ navigation }) => {
  let feeling = store.getState().image["imageResult"];
  // feeling = [
  //   {
  //     Confidence: 52.84242630004883,
  //     Type: "HAPPY",
  //   },
  //   {
  //     Confidence: 31.79851531982422,
  //     Type: "CALM",
  //   },
  //   {
  //     Confidence: 6.743500232696533,
  //     Type: "SURPRISED",
  //   },
  //   {
  //     Confidence: 6.225941181182861,
  //     Type: "FEAR",
  //   },
  //   {
  //     Confidence: 5.255831718444824,
  //     Type: "CONFUSED",
  //   },
  //   {
  //     Confidence: 3.8689191341400146,
  //     Type: "SAD",
  //   },
  //   {
  //     Confidence: 2.0175960063934326,
  //     Type: "ANGRY",
  //   },
  //   {
  //     Confidence: 1.977848768234253,
  //     Type: "DISGUSTED",
  //   },
  // ];

  const data = feeling?.map((e, index) => {
    return {
      id: index + 1,
      value: e.Confidence * 0.01,
      color: generateColor(),
      type: e.Type.charAt(0).toUpperCase() + e.Type.slice(1).toLowerCase(),
      percentage: e.Confidence,
    };
  });

  const progressQuiz = () => {
    return (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 10,
          marginTop: 8,
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "450",
                  paddingVertical: 8,
                  borderBottomWidth: 0.5,
                  borderColor: "#ddd",
                }}
              >
                Image Result
              </Text>
            </View>
            <View style={{ marginBottom: Sizes.fixPadding * 2 }}>
              {data.map((e) => (
                <View key={e.id} style={styles.progressBar}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                      {e.type}
                    </Text>
                    <Text
                      style={{ fontSize: 14, fontWeight: "400", marginTop: 1 }}
                    >
                      {e.percentage}%
                    </Text>
                  </View>
                  <View>
                    <ProgressBar
                      style={{ height: 20, borderRadius: 8, marginTop: 4 }}
                      progress={e.value}
                      color={e.color}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  function signupInfo() {
    return (
      <View>
        <MaskedView
          style={{ height: 35 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.bold30 }}>Result</Text>
          }
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        {progressQuiz()}
        {continueButton()}
      </View>
    );
  }

  function continueButton() {
    return (
      <View style={styles.onWrapButton}>
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
            <Text style={{ ...Fonts.whiteColor18Bold }}>Retry</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButtonStyle}
          activeOpacity={0.9}
          onPress={() => {
            navigation.push(Navigate.BOTTOM_TAB_BAR);
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.signupButtonGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
      <View>
        <ScrollView
          contentContainerStyle={{ marginTop: -50 }}
          showsVerticalScrollIndicator={false}
        >
          {cornerImage()}

          {signupInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    marginHorizontal: 10,
    marginTop: 10,
  },
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
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },

  signupButtonStyle: {
    marginTop: Sizes.fixPadding * 2.5,
    borderRadius: Sizes.fixPadding - 5.0,
  },

  onWrapButton: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding,
    justifyContent: "space-between",
  },
  result: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 5.0,
    marginTop: Sizes.fixPadding * 2.5,
    padding: Sizes.fixPadding,
    borderColor: "black",
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 15,
  },
});

export default CamResultScreen;
