import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userAction } from "../redux/auth/auth.slice";
import { useDispatch } from "react-redux";
import { store } from "../core/store/store";
import { ARTIST_ROLE } from "../constants/role";
import { configAudio, configOptionsGlobal } from "../utils/app.configuration";
import {
  getTokenFromLocal,
  getUserFromLocal,
} from "../utils/app.local_handler";
import { Navigate } from "../constants/navigate";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const storeConfig = async () => {
    try {
      const value = await AsyncStorage.getItem("Configuration");
      if (!value) {
        configAudio();
        dispatch(userAction.storeAudio(configOptionsGlobal));
      }
    } catch (e) {
      console.log("store configuration error:", e);
    }
  };

  setTimeout(async () => {
    //load configuratio
    await storeConfig();
    //load locla data
    const retrievedToken = await getTokenFromLocal();
    const retrivedUser = await getUserFromLocal();
    if (!retrievedToken || !retrivedUser) {
      navigation.navigate("SignIn");
    } else {
      dispatch(userAction.storeTokenWithoutLocal(retrievedToken));
      dispatch(userAction.storeUserWithoutLocal(retrivedUser));
      const role = store.getState().user.role;
      if (role === ARTIST_ROLE) {
        navigation.push(Navigate.ARTIST_PROFILE);
      } else {
        navigation.push(Navigate.OPTION_SCREEN);
      }
    }
  }, 2000);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.secondaryColor} />
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 1, y: 0.2 }}
          end={{ x: 1, y: 1 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
          style={{ flex: 1 }}
        >
          <ImageBackground
            source={require(".././assets/images/bg.png")}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../assets/images/white-logo.png")}
              style={{ height: 150.0, width: "100%" }}
            />
            <Text style={{ marginTop: Sizes.fixPadding - 60.0 }}>
              <Text style={{ ...Fonts.whiteColor35Bold }}>Music</Text>
              <Text style={{ ...Fonts.whiteColor15Bold }}>{` `}of you</Text>
            </Text>
          </ImageBackground>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
