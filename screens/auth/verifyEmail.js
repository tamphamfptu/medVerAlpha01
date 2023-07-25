import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Navigate } from "../../constants/navigate";

const VerifyEmail = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      <View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {cornerImage()}
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {emailTitle()}
            {backToSignInBtn()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function emailTitle() {
    return (
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
        style={styles.resultInfo}
      >
        <Text style={styles.resultInfoStyle}>Please verify your email</Text>
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://cdn1.iconfinder.com/data/icons/aami-web-internet/64/aami3-21-256.png",
            }}
          />
        </View>
      </LinearGradient>
    );
  }

  function backToSignInBtn() {
    return (
      <View style={styles.doneWrapper}>
        <View style={styles.alreadyText}>
          <Text style={{ ...Fonts.grayColor16Medium }}>
            Already verify email?
          </Text>
        </View>
        <Pressable
          style={styles.doneQuizButtonStyle}
          activeOpacity={0.9}
          onPress={() => {
            navigation.push(Navigate.SIGN_IN);
          }}
        >
          <LinearGradient
            start={{ x: 1, y: 3 }}
            end={{ x: 0, y: 2 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
            style={styles.doneQuizGradientStyle}
          >
            <Text style={{ ...Fonts.whiteColor16Bold }}>Sign In</Text>
          </LinearGradient>
        </Pressable>
      </View>
    );
  }
};
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
const styles = StyleSheet.create({
  doneWrapper: {
    marginTop: Sizes.fixPadding * 10.0,
  },
  alreadyText: {
    flexDirection: "row",
    justifyContent: "center",
  },

  resultInfo: {
    paddingVertical: Sizes.fixPadding + 50.0,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 40.0,
  },
  resultInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },

  logo: {
    width: 80,
    height: 70,
    tintColor: "white",
  },

  doneQuizButtonStyle: {
    marginHorizontal: Sizes.fixPadding * 10.0,
    borderRadius: Sizes.fixPadding - 4.0,
  },
  doneQuizGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
  },
});

export default VerifyEmail;
