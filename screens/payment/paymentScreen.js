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
import { Button } from "react-native-paper";
import { Navigate } from "../../constants/navigate";

const paymentScreen = ({ navigation }) => {
  const [clickedPaypal, setClickedPaypal] = useState(false);
  const [clickedCard, setClickedCreditCard] = useState(false);
  const onPressPaypal = () => {
    if (clickedPaypal === false) {
      setClickedPaypal(true);
    } else {
      setClickedPaypal(false);
    }
  };
  const onPressCreditCard = () => {
    if (clickedCard === false) {
      setClickedCreditCard(true);
    } else {
      setClickedCreditCard(false);
    }
  };

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
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {paymentTitle()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function paymentTitle() {
    return (
      <View style={{ marginBottom: Sizes.fixPadding * 50.0 }}>
        <MaskedView
          style={{ flex: 1, height: 75 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.bold22 }}>
              Choose Payment Method
            </Text>
          }
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["#000000", "#000000"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        {paymentButton()}
        {backButton()}
      </View>
    );
  }

  // function handlePaypal() {
  //   return (
  //     <View>
  //       <PayPalScriptProvider
  //         options={{ "client-id": SCRIPT_PROVIDER_OPTIONS }}
  //         deferLoading={false}
  //       >
  //         <PayPalButtons />
  //       </PayPalScriptProvider>
  //     </View>
  //   );
  // }

  function paymentButton() {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPressCreditCard} activeOpacity={0.5}>
            <View>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
                style={styles.paymentButtonGradientStyle}
              >
                <View>
                  <Text style={{ ...Fonts.whiteColor18Bold }}>Credit Card</Text>
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <View>
            {clickedCard ? (
              <View>
                <Text>Will be updated in the future</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPressPaypal} activeOpacity={0.5}>
            <View>
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
                style={styles.paymentButtonGradientStyle}
              >
                <Text style={{ ...Fonts.whiteColor18Bold }}>Paypal</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <View>{clickedPaypal ? <Button>Paypal</Button> : null}</View>
        </View>
      </View>
    );
  }

  function backButton() {
    return (
      <TouchableOpacity
        style={styles.backButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          navigation.push(Navigate.SUBSCRIBE);
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.backButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Choose Again</Text>
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
};

const styles = StyleSheet.create({
  backButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    paddingHorizontal: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    mar: "center",
    borderRadius: Sizes.fixPadding + 10.0,
  },
  backButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 10,
    marginHorizontal: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding + 10.0,
  },
  paymentButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: Sizes.fixPadding - 1.0,
  },

  paymentButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding + 10.0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#7f8798",
    padding: 10,
    borderRadius: 20,
  },
  paypal_btn: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 10.0,
    title: "c48440",
  },
});

export default paymentScreen;
