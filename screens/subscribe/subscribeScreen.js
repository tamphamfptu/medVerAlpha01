import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import {
  useCreateSubscriptionApi,
  useGetSubscriptionType,
} from "../../hooks/subscription.hook";
import { handleWebNavigation } from "../../utils/app.util";
import { ActivityIndicator } from "react-native-paper";

const subscriptionAllowsList = [
  "Download unlimited songs",
  "View song lyrics while playing song",
  "High quality sound quality",
  "Add free song play",
];

const SubscribeScreen = ({ navigation }) => {
  const {
    data: subscribePackageListData,
    isSuccess: isSubscribePackageListSuccess,
  } = useGetSubscriptionType();
  const { mutate, isSuccess, data } = useCreateSubscriptionApi();
  const createSubscription = (planId) => {
    mutate({
      planId: planId,
    });
    if (isSuccess) {
      const url = data["links"][0].href;
      handleWebNavigation(url);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0 }}
        >
          {cornerImage()}
          {header()}
          {packages()}
          {subscriptionAllowsInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function subscriptionAllowsInfo() {
    return (
      <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
        <Text
          style={{
            marginTop: Sizes.fixPadding,
            marginBottom: Sizes.fixPadding + 5.0,
            ...Fonts.blackColor15Bold,
          }}
        >
          Subscription allows
        </Text>
        {subscriptionAllowsList.map((item, index) => (
          <View key={`${index}`}>
            <View
              style={{
                marginBottom: Sizes.fixPadding + 10.0,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={styles.checkIconWrapStyle}>
                <MaterialIcons
                  name="check"
                  color={Colors.whiteColor}
                  size={12}
                />
              </View>
              <Text
                style={{
                  marginLeft: Sizes.fixPadding,
                  ...Fonts.blackColor13SemiBold,
                }}
              >
                {item}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
  function packages() {
    return isSubscribePackageListSuccess ? (
      subscribePackageListData.map((item) => (
        <View key={`${item.id}`}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              createSubscription(item.id);
            }}
          >
            <ImageBackground
              source={require("../../assets/images/card-design.png")}
              style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                height: 130.0,
                marginBottom: Sizes.fixPadding + 5.0,
              }}
              borderRadius={Sizes.fixPadding - 5.0}
            >
              <View
                style={{
                  marginBottom: Sizes.fixPadding + 5.0,
                  marginHorizontal: Sizes.fixPadding * 2.0,
                  justifyContent: "flex-end",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...Fonts.whiteColor15Bold,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ ...Fonts.whiteColor22Light }}>{item.desc}</Text>
                <Text
                  style={{
                    alignSelf: "flex-end",
                    ...Fonts.whiteColor22Light,
                  }}
                >
                  $ {item.cost}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#f8b26a" />
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

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.pop()}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            colors={[
              { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
              { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
            ]}
            style={{
              marginRight: Sizes.fixPadding - 5.0,
              marginTop: Sizes.fixPadding - 5.0,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Subscribe</Text>}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding + 10.0,
    marginTop: Sizes.fixPadding - 40.0,
  },
  checkIconWrapStyle: {
    width: 18.0,
    height: 18.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5B2544",
    borderRadius: Sizes.fixPadding - 7.0,
  },
});

export default SubscribeScreen;
