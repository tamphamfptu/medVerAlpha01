import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  useGetUserByNameApi,
  useGetUserProfile,
  useUpdateUserAccountDetails,
  useUpdateUserAvatar,
} from "../../hooks/user.hook";
import { store } from "../../core/store/store";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { useDispatch } from "react-redux";
import { userAction } from "../../redux/auth/auth.slice";
import { Modal } from "react-native-paper";
import { TextInput } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { getUserFromDb } from "../../utils/app.util";
import { Navigate } from "../../constants/navigate";

let profile = [];

const editProfileScreen = ({ navigation }) => {
  const [updatedFirstName, setUpdatedFirstName] = useState();
  const [updatedLastName, setUpdatedLastName] = useState();
  const [updatedEmail, setUpdatedEmail] = useState();
  const [updatedCity, setUpdatedCity] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState();
  const userName = store.getState()?.user?.username;
  const userAvatar = getUserFromDb()?.avatar?.url;
  const userFirstName = getUserFromDb()?.firstName;
  const userLastName = getUserFromDb()?.lastName;
  const userEmail = getUserFromDb()?.email;
  const userGender = getUserFromDb()?.gender;
  const userCity = getUserFromDb()?.city;
  const userDob = getUserFromDb()?.dob;
  const userAddress = getUserFromDb()?.address;
  const dispatch = useDispatch();
  useEffect(() => {
    setUpdatedFirstName();
    setUpdatedLastName();
    setUpdatedEmail();
    setUpdatedCity();
    setUpdatedAddress();
  }, [isModalVisible]);
  const { data, isSuccess, isError, error } = useGetUserProfile();
  const { userData, isSuccess: isSuccessUser, refetch } = useGetUserByNameApi();
  const formatNumber = (number) => {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "B";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K";
    }
    return number?.toString();
  };

  if (isSuccess) {
    profile = data["data"];
  }

  if (isSuccessUser) {
    const userInfo = userData["data"];
    dispatch(userAction.storeUser(userInfo));
  }

  const handleEditIconPress = () => {
    setIsModalVisible(true);
  };

  const favoritedCount = formatNumber(profile?.favorite);
  const playlistCount = formatNumber(profile?.playlist);
  const followingCount = formatNumber(profile?.following);

  const { mutate } = useUpdateUserAvatar();
  const { mutate: mutatee } = useUpdateUserAccountDetails();

  const handleUploadImage = async (form) => {
    mutate(form, {
      onSuccess: (data) => {
        const dataEmotion = data["data"];
        refetch();
        Alert.alert("Processing image...");
        setTimeout(() => {
          navigation.push(Navigate.BOTTOM_TAB_BAR);
        }, 3000);
      },
    });
  };

  const handleUpdateAccountDetails = async (form) => {
    mutatee(form, {
      onSuccess: (data) => {
        console.log("Success");
        refetch();
        setTimeout(() => {
          navigation.push(Navigate.BOTTOM_TAB_BAR);
        }, 3000);
      },
    });
  };

  const saveUpdateAccountDetails = async () => {
    const formData = new FormData();
    if (updatedFirstName) {
      formData.append("firstName", updatedFirstName);
    }
    if (updatedLastName) {
      formData.append("lastName", updatedLastName);
    }
    if (updatedEmail) {
      formData.append("email", updatedEmail);
    }
    if (updatedCity) {
      formData.append("city", updatedCity);
    }
    if (updatedAddress) {
      formData.append("address", updatedAddress);
    }
    handleUpdateAccountDetails(formData);
  };

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
    if (!pickerResult.cancelled) {
      // Image selected successfully, handle the file conversion
      convertImageToJPEG(pickerResult.uri);
      const formData = new FormData();
      formData.append("avatar", {
        uri: pickerResult.uri,
        type: "image/jpeg",
        name: pickerResult.fileName,
      });

      handleUploadImage(formData);
    }
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {cornerImage()}
              {header()}
              {Profile()}
              {accountDetails()}
              {accountDetailsEdit()}
            </>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        />
      </View>
    </SafeAreaView>
  );

  function Profile() {
    return (
      <View style={styles.container}>
        <View style={styles.rect}>
          <View style={styles.imageRow}>
            <ImageBackground
              source={{
                uri: `${userAvatar}`,
              }}
              resizeMode="contain"
              style={styles.image}
            >
              <TouchableOpacity
                style={styles.overlay}
                onPress={selectAvatarImage}
              >
                <MaterialIcons name="add-a-photo" size={24} color="black" />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.name}>{userName}</Text>
          </View>
          <View style={styles.detailWrapper}>
            <View>
              <Text style={styles.detailedText}>Favorited</Text>
              <Text>{favoritedCount}</Text>
            </View>
            <View>
              <Text style={styles.detailedText}>Playlist</Text>
              <Text>{playlistCount}</Text>
            </View>
            <View>
              <Text style={styles.detailedText}>Following</Text>
              <Text>{followingCount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function accountDetails() {
    return (
      <View style={styles.rect2}>
        <View style={styles.detailtTileWrapper}>
          <View>
            <Text style={styles.detailtTextTitle}>Account Details</Text>
          </View>
          <View>
            <Ionicons
              name="md-create"
              size={24}
              color="black"
              onPress={() => handleEditIconPress()}
            />
          </View>
        </View>

        <View style={styles.detailInfoWrapper}>
          <View>
            <Text style={styles.detailedText}>First Name</Text>
            <Text>{userFirstName}</Text>
          </View>
          <View>
            <Text style={styles.detailedText}>Last Name</Text>
            <Text>{userLastName}</Text>
          </View>
          <View>
            <Text style={styles.detailedText}>Email</Text>
            <Text>{userEmail}</Text>
          </View>
          <View>
            <Text style={styles.detailedText}>Gender</Text>
            <Text>{userGender}</Text>
          </View>
          <View>
            <Text style={styles.detailedText}>City</Text>
            <Text>{userCity} </Text>
          </View>
          <View>
            <Text style={styles.detailedText}>Dob</Text>
            <Text>{userDob} </Text>
          </View>
          <View>
            <Text style={styles.detailedText}>Address</Text>
            <Text>{userAddress} </Text>
          </View>
        </View>
      </View>
    );
  }

  function accountDetailsEdit() {
    return (
      <Modal visible={isModalVisible} animationType="fade" transparent={false}>
        <BlurView intensity={200} style={StyleSheet.absoluteFill}>
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.detailtTextTitle}>
                Update Account Details
              </Text>
              <Text style={styles.detailedEditText}>First Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={updatedFirstName}
                  onChangeText={setUpdatedFirstName}
                  placeholder={userFirstName}
                />
              </View>
              <Text style={styles.detailedText}>Last Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={updatedLastName}
                  onChangeText={setUpdatedLastName}
                  placeholder={userLastName}
                />
              </View>
              <Text style={styles.detailedText}>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={updatedEmail}
                  onChangeText={setUpdatedEmail}
                  placeholder={userEmail}
                />
              </View>
              <Text style={styles.detailedText}>City</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={updatedCity}
                  onChangeText={setUpdatedCity}
                  placeholder={userCity}
                />
              </View>
              <Text style={styles.detailedText}>Adress</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={updatedAddress}
                  onChangeText={setUpdatedAddress}
                  placeholder={userAddress}
                />
              </View>
              <View style={styles.optionsRow}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    saveUpdateAccountDetails();
                  }}
                >
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
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
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Edit</Text>}
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
    marginTop: Sizes.fixPadding - 30.0,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  container: {
    flex: 2,
  },
  rect: {
    width: 350,
    height: 250,
    backgroundColor: "#E6E6E6",
    marginLeft: 20,
    borderRadius: 30,
    borderWidth: 2,
  },
  rect2: {
    width: 350,
    height: 400,
    backgroundColor: "#E6E6E6",
    marginLeft: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 121,
    marginLeft: 20,
    borderRadius: 10,
  },
  name: {
    color: "#121212",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 44,
  },
  detailtTextTitle: {
    color: "#121212",
    fontSize: 24,
    fontWeight: "bold",
  },
  imageRow: {
    height: 121,
    flexDirection: "row",
    marginTop: 29,
    marginRight: 124,
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  favorited: {
    color: "#121212",
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  playlists: {
    color: "#121212",
    marginLeft: 51,
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  following: {
    color: "#121212",
    marginLeft: 51,
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  detailWrapper: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 21,
    marginRight: 35,
  },
  favoritedTextRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding + 15,
    marginTop: Sizes.fixPadding + 5,
    marginBottom: Sizes.fixPadding,
    marginRight: 50,
  },
  detailedText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  detailedEditText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: Sizes.fixPadding + 10,
  },
  profileAbout: {
    color: "#121212",
    marginTop: 11,
    marginLeft: 27,
  },
  publicPlaylists: {
    color: "#121212",
    marginTop: 20,
    marginLeft: 26,
  },
  following2: {
    color: "#121212",
    marginTop: 125,
    marginLeft: 27,
  },
  recentlyPalyedSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor15Bold,
  },
  titleWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    right: 15,
    top: 30,
  },
  detailtTileWrapper: {
    flexDirection: "row",
    marginHorizontal: Sizes.fixPadding,
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: Sizes.fixPadding + 5,
  },
  detailInfoWrapper: {
    flex: 1,
    flexDirection: "column",
    marginLeft: Sizes.fixPadding + 5,
    justifyContent: "space-between",
    alignItems: "stretch",
    marginTop: Sizes.fixPadding + 20,
    marginBottom: Sizes.fixPadding,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    height: 420,
    alignSelf: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    transform: [{ translateY: -250 }],
    paddingHorizontal: Sizes.fixPadding * 2,
    borderRadius: 22.5,
    borderColor: "#DFDFDF",
    borderWidth: 0.5,
    marginHorizontal: Sizes.fixPadding + 5,
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  inputContainer: {
    backgroundColor: "#E6E6E6",
    borderRadius: 8,
    padding: 1,
    marginTop: 5,
  },
});

export default editProfileScreen;
