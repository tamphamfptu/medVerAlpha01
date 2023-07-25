import React, { useState, useRef, useEffect } from "react";
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
import { Camera } from "expo-camera";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useFaceRegApi } from "../../hooks/face.hook";
import * as FileSystem from "expo-file-system";
import { imageAction } from "../../redux/other/image.slice";
import { Navigate } from "../../constants/navigate";
import { store } from "../../core/store/store";
const ShowCamScreen = ({ navigation }) => {
  const [form, setForm] = useState(null);
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

  function signupInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding - 20.0,
        }}
      >
        <MaskedView
          style={{ flex: 1, height: 45 }}
          maskElement={
            <Text
              style={{
                textAlign: "center",
                ...Fonts.bold30,
              }}
            >
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
        {CameraScreen()}
      </View>
    );
  }

  function CameraScreen() {
    const dispatch = useDispatch();
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);
    const [isPreview, setIsPreview] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const { mutate } = useFaceRegApi();
    const handleProcessImage = async (form) => {
      mutate(form, {
        onSuccess: (data) => {
          const dataEmotion = data;
          console.log("data from dataEmotion", dataEmotion);
          dispatch(imageAction.storeImage(dataEmotion));
          console.log(
            "Save result successfully",
            store.getState().image.imageResult
          );
          setTimeout(() => {
            navigation.push(Navigate.CAM_RESULT);
          }, 5000);
        },
        onError: (error) => {
          console.log("Can not process image", error);
        },
      });
    };

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, []);

    const toggleCamera = () => {
      setCameraType(
        cameraType === Camera.Constants.Type.front
          ? Camera.Constants.Type.back
          : Camera.Constants.Type.front
      );
    };

    const takePicture = async () => {
      if (cameraRef.current) {
        const options = { quality: 0.5, base64: true, skipProcessing: true };
        const data = await cameraRef.current.takePictureAsync(options);
        const source = data.uri;
        if (source) {
          await cameraRef.current.pausePreview();
          setIsPreview(true);
          setCapturedImage(data.uri);
          const fileUri = `${FileSystem.documentDirectory}image.jpg`;
          await FileSystem.copyAsync({
            from: source,
            to: fileUri,
            type: FileSystem.MIME_TYPE_JPEG,
          });
          const formData = new FormData();
          console.log(fileUri);
          formData.append("file", {
            uri: fileUri,
            name: "image.jpeg",
            type: "image/jpeg",
          });
          setForm(formData);
        }
      }
    };

    const retakePicture = async () => {
      await cameraRef.current.resumePreview();
      setIsPreview(false);
      setCapturedImage(null);
    };

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={cameraType}
          ref={cameraRef}
          onCameraReady={() => console.log("Camera is ready")}
        ></Camera>
        {isPreview ? (
          <View style={styles.preview}>
            <Image
              source={{ uri: capturedImage }}
              style={styles.previewImage}
            />
            <TouchableOpacity style={styles.retakeBtn} onPress={retakePicture}>
              <MaterialCommunityIcons
                name="camera-retake"
                size={28}
                color="black"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButtonStyle}
              activeOpacity={0.9}
              onPress={() => {
                Alert.alert("Processing image...");
                handleProcessImage(form);
              }}
            >
              <LinearGradient
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
                style={styles.continueButtonGradientStyle}
              >
                <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraBtnWrapper}>
            <TouchableOpacity
              onPress={toggleCamera}
              style={styles.flipImageBtn}
            >
              <MaterialCommunityIcons
                name="camera-flip-outline"
                size={28}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.takeCameraBtn}
            >
              <AntDesign name="camera" size={28} color="black" />
            </TouchableOpacity>
          </View>
        )}
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
  retakeBtn: {
    alignItems: "center",
  },

  takeCameraBtn: {
    marginLeft: Sizes.fixPadding * 16.5,
  },
  cameraBtnWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: 5.5,
    justifyContent: "flex-start",
  },
  flipImageBtn: {},
  retakeText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
    marginTop: Sizes.fixPadding,
    marginLeft: 5,
    width: Sizes.fixPadding * 40,
    height: Sizes.fixPadding * 50,
  },
  continueButtonGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  continueButtonStyle: {
    justifyContent: "center",
    marginTop: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 15,
    borderRadius: Sizes.fixPadding - 5.0,
  },
});

export default ShowCamScreen;
