import React, { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useUpdateUserAccountDetails } from "../../hooks/user.hook";
import { Alert } from "react-native";
import { Navigate } from "../../constants/navigate";
import moment from "moment";

const EditUserScreen = ({ navigation, route }) => {
  const profile = route.params.profile;
  console.log(profile);
  const [state, setState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    city: null,
    address: null,
    dob: null,
    avatar: null,
    backClickCount: 0,
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const {
    firstName,
    lastName,
    email,
    city,
    address,
    dob,
    avatar,
    backClickCount,
  } = state;
  const { mutate } = useUpdateUserAccountDetails();
  const backAction = () => {
    backClickCount === 1 ? BackHandler.exitApp() : _spring();
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  function _spring() {
    updateState({ backClickCount: 1 });
    setTimeout(() => {
      updateState({ backClickCount: 0 });
    }, 1000);
  }

  const selectAvatarImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: false,
    });
    updateState({ avatar: pickerResult });
  };
  const convertImageToJPEG = async (uri) => {
    const fileName = "myImage.jpg"; // Provide a desired name for the JPEG file

    const fileExtension = uri.split(".").pop();
    const convertedUri = `${FileSystem.cacheDirectory}${fileName}`;

    if (
      fileExtension.toLowerCase() === "jpg" ||
      fileExtension.toLowerCase() === "jpeg"
    ) {
      handleUploadImage(uri, fileName);

      return;
    }

    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800, height: 800 } }],
        {
          format: ImageManipulator.SaveFormat.JPEG,
          compress: 1,
          base64: false,
          uri: convertedUri,
        }
      );
      return;
    } catch (error) {
      console.log("Error converting image to JPEG:", error);
    }
  };
  const handleUpdateAccountDetails = async (form) => {
    mutate(form, {
      onSuccess: (data) => {
        console.log("Update Success", data);
        Alert.alert("Update Success");
        setTimeout(() => {
          navigation.push(Navigate.BOTTOM_TAB_BAR);
        }, 3000);
      },
      onError: (error) => {
        console.log("Update failed", error);
      },
    });
  };

  const saveUpdateAccountDetails = async () => {
    const formData = new FormData();
    if (firstName) {
      formData.append("firstName", firstName);
    }
    if (lastName) {
      formData.append("lastName", lastName);
    }
    if (email) {
      formData.append("email", email);
    }
    if (city) {
      formData.append("city", city);
    }
    if (dob) {
      formData.append("dob", dob);
    }
    if (address) {
      formData.append("address", address);
    }
    if (avatar) {
      formData.append("avatar", {
        uri: avatar.uri,
        type: "image/jpeg",
        name: avatar.fileName,
      });
    }
    console.log(formData);
    handleUpdateAccountDetails(formData);
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
            {signInInfo()}
          </ScrollView>
        </ScrollView>
      </View>
      {backClickCount === 1 ? (
        <View style={[styles.animatedView]}>
          <Text style={{ ...Fonts.whiteColor12Medium }}>
            Press Back Once Again to Exit
          </Text>
        </View>
      ) : null}
    </SafeAreaView>
  );

  function signInInfo() {
    return (
      <View>
        <MaskedView
          style={{ flex: 1, height: 35 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.bold30 }}>
              Edit User
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
        {firstNameTextField()}
        {lastNameTextField()}
        {emailTextField()}
        {addressTextField()}
        {dobTextField()}
        {cityTextField()}
        {avatarTextField()}
        {signInButton()}
      </View>
    );
  }

  function signInButton() {
    return (
      <Pressable
        style={styles.signInButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          saveUpdateAccountDetails();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.signInButtonGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>SAVE</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  function firstNameTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="lock-open" size={20} color={Colors.grayColor} />
          <TextInput
            value={firstName}
            onChangeText={(text) => updateState({ firstName: text })}
            selectionColor={Colors.grayColor}
            placeholder={profile.firstName}
            placeholderTextColor={Colors.grayColor}
            style={{
              flex: 1,
              ...Fonts.blackColor13Bold,
              marginLeft: Sizes.fixPadding,
            }}
          />
        </View>
      </View>
    );
  }

  function lastNameTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={lastName}
          onChangeText={(text) => updateState({ lastName: text })}
          selectionColor={Colors.grayColor}
          placeholder={profile.lastName}
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
      </View>
    );
  }
  function emailTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={email}
          onChangeText={(text) => updateState({ email: text })}
          selectionColor={Colors.grayColor}
          placeholder={profile.email}
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
      </View>
    );
  }
  function cityTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={city}
          onChangeText={(text) => updateState({ city: text })}
          selectionColor={Colors.grayColor}
          placeholder={profile.city}
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
      </View>
    );
  }
  function addressTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={address}
          onChangeText={(text) => updateState({ address: text })}
          selectionColor={Colors.grayColor}
          placeholder={profile.address}
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
      </View>
    );
  }
  function dobTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <MaterialIcons name="person" color={Colors.grayColor} size={20} />
        <TextInput
          value={dob}
          onChangeText={(text) => updateState({ dob: text })}
          selectionColor={Colors.grayColor}
          placeholder={moment(profile.dob).format("DD-MM-YYYY")}
          placeholderTextColor={Colors.grayColor}
          style={{
            marginLeft: Sizes.fixPadding,
            flex: 1,
            ...Fonts.blackColor14Bold,
          }}
        />
      </View>
    );
  }
  function avatarTextField() {
    return (
      <View style={styles.userNameTextFieldWrapStyle}>
        <MaterialCommunityIcons
          name="file-upload-outline"
          color={Colors.grayColor}
          size={20}
          onPress={() => {
            selectAvatarImage();
          }}
        />
        <Text>Upload avatar</Text>
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
};

const styles = StyleSheet.create({
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  userNameTextFieldWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  passwordTextFieldWrapStyle: {
    marginVertical: Sizes.fixPadding,
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
  signInButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  signInButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.5,
    marginHorizontal: Sizes.fixPadding * 2.0,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  failWarningWrapper: {
    alignItems: "center",
    paddingHorizontal: Sizes.fixPadding + 9,
    marginTop: Sizes.fixPadding,
  },
  warningText: { color: "red", fontSize: 13, fontWeight: "bold" },
});

export default EditUserScreen;
