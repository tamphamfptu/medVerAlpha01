import React, { useCallback } from "react";
import {
  BackHandler,
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { Navigate } from "../../constants/navigate";

const PaymentFailedScreen = ({ navigation }) => {
  const backAction = () => {
    navigation.push(Navigate.BOTTOM_TAB_BAR);
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
        >
          {cornerImage()}
          {failedImage()}
          {failedInfo()}
        </ScrollView>
        {tryAgainButton()}
      </View>
    </SafeAreaView>
  );

  function tryAgainButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.push(Navigate.BOTTOM_TAB_BAR);
        }}
        style={{
          justifyContent: "center",
          margin: Sizes.fixPadding * 2.0,
          borderRadius: Sizes.fixPadding - 5.0,
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.tryAgainButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Try Again</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function failedInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 2.0,
          alignItems: "center",
        }}
      >
        <Text style={{ ...Fonts.blackColor22Bold }}>Oops!!</Text>
        <Text style={{ ...Fonts.blackColor15Bold }}>Payment Faild</Text>
        <Text
          style={{
            marginTop: Sizes.fixPadding * 3.0,
            ...Fonts.blackColor12SemiBold,
            textAlign: "center",
          }}
        >
          {`Something Went Wrong\nPlease Try Again`}
        </Text>
      </View>
    );
  }

  function failedImage() {
    return (
      <Image
        source={require("../../assets/images/payment-fail.png")}
        style={{
          alignSelf: "center",
          height: 140.0,
          marginTop: Sizes.fixPadding * 2.0,
        }}
        resizeMode="contain"
      />
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
};

const styles = StyleSheet.create({
  tryAgainButtonStyle: {
    paddingVertical: Sizes.fixPadding + 2.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

export default PaymentFailedScreen;
