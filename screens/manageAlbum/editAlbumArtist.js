import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import {
  useGetPlaylist,
  useGetPlaylistByIdAPI,
  useUpdatePlaylistForArtistAPI,
} from "../../hooks/playlist.hook";
import { useDispatch } from "react-redux";
import { playlistAction } from "../../redux/other/playlist.slice";
import { store } from "../../core/store/store";
import { useMutation } from "react-query";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
let forYouList = [];
let album = [
  {
    id: "1r",
    image: require("../../assets/images/songsCoverPicks/coverImage1.png"),
    category: "Morning chill",
  },
  {
    id: "2r",
    image: require("../../assets/images/songsCoverPicks/coverImage2.png"),
    category: "Daily Mix",
  },
  {
    id: "3r",
    image: require("../../assets/images/songsCoverPicks/coverImage3.png"),
    category: "Top Trending",
  },
  {
    id: "4r",
    image: require("../../assets/images/songsCoverPicks/coverImage4.png"),
    category: "Pop Music",
  },
];

const EditAlbumArtistScreen = ({ navigation }) => {
  let activeAlbum = store.getState().playlist.activePlaylist;
  const [modalVisible, setModalVisible] = useState(false);

  const [state, setState] = useState({
    name: null,
    description: null,
    forYouData: forYouList,
    pauseSong: true,
    showOptions: false,
  });
  const updateState = (data) => setState((state) => ({ ...state, ...data }));
  const { name, description } = state;
  const { mutate } = useUpdatePlaylistForArtistAPI();
  const { data, isSuccess, isError, error } = useGetPlaylist();
  let playlistInfo;
  const dispatch = useDispatch();
  useEffect(() => {
    updateState({ name: null, description: null });
    console.log("Clear input data");
  }, [modalVisible]);
  const handleUpdatePLaylistInfo = () => {
    mutate(
      {
        name: state.name,
        description: state.description,
      },
      {
        onSuccess: (data) => {
          const dataRaw = data["data"];
          console.log("Update Success", dataRaw);
        },
        onError: (error) => {
          console.log("Error when updating Album Info", error);
        },
      }
    );
  };
  const {
    data: dataById,
    isSuccess: isSuccessById,
    isError: isErrorById,
    error: errorById,
    refetch,
  } = useGetPlaylistByIdAPI();
  if (isSuccessById) {
    playlistInfo = dataById["data"];
  }
  if (isErrorById) {
    console.log("error get playlist info", errorById);
  }

  const handlePlaylistPress = (playlistId) => {
    try {
      dispatch(playlistAction.setPlaylistId(playlistId));
      refetch();
      console.log(store.getState().playlist.playlistId);
    } catch (error) {
      console.log("Error saving selected playlist ID", error);
    }
  };

  const { showOptions } = state;
  const showAlbumInfo = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            {playlistInfo && (
              <View style={styles.modalView}>
                <View>
                  <Text>Input new informations</Text>
                </View>
                <Image
                  style={{ width: 130.0, height: 120.0, marginTop: 20 }}
                  source={{ uri: `${playlistInfo.imageUrl}` }}
                />
                <View style={{ justifyContent: "center" }}>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{ marginTop: 21 }}>
                      <Text>Name:</Text>
                    </View>
                    <View>
                      <TextInput
                        value={name}
                        onChangeText={(text) => updateState({ name: text })}
                        selectionColor={Colors.grayColor}
                        placeholder={playlistInfo.name}
                        placeholderTextColor={Colors.grayColor}
                        style={styles.input}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Text style={{ marginTop: 21 }}>Description</Text>
                    <TextInput
                      value={description}
                      onChangeText={(text) =>
                        updateState({ description: text })
                      }
                      selectionColor={Colors.grayColor}
                      placeholder={playlistInfo.description}
                      placeholderTextColor={Colors.grayColor}
                      style={styles.input}
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: 20,
                  }}
                >
                  <View>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                  </View>
                  <View>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => handleUpdatePLaylistInfo()}
                    >
                      <Text style={styles.textStyle}>Update</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
        >
          {cornerImage()}
          {header()}
          {recommendedInfo()}
          {showAlbumInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function recommendedInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          handlePlaylistPress(item.id);
          setModalVisible(true);
        }}
      >
        <ImageBackground
          source={{ uri: `${item.imageUrl}` }}
          style={{
            width: 130.0,
            height: 120.0,
            marginTop: Sizes.fixPadding + 5.0,
            marginRight: Sizes.fixPadding,
          }}
          borderRadius={Sizes.fixPadding - 5.0}
        >
          <LinearGradient
            start={{ x: 1, y: 0.2 }}
            end={{ x: 1, y: 1 }}
            colors={["rgba(255, 124, 0,0.5)", "rgba(41, 10, 89, 0.5)"]}
            style={{ flex: 1, borderRadius: Sizes.fixPadding - 5.0 }}
          >
            <Text
              style={{
                padding: Sizes.fixPadding - 5.0,
                ...Fonts.whiteColor12Medium,
              }}
            >
              {item.name}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );

    return (
      <View>
        <FlatList
          data={activeAlbum}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          contentContainerStyle={{ paddingLeft: Sizes.fixPadding * 12 }}
        />
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
        <AntDesign
          onPress={() => {
            navigation.pop();
          }}
          style={{ width: 30 }}
          name="left"
          size={27}
          color="black"
        />
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={
            <Text style={{ ...Fonts.bold22 }}>Choose Album to edit</Text>
          }
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
    marginHorizontal: Sizes.fixPadding * 6.0,
    marginTop: Sizes.fixPadding - 40.0,
  },
  searchBarWrapStyle: {
    backgroundColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding * 2.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
  },
  titleStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.blackColor15Bold,
  },
  titleWrapStyle: {
    marginRight: Sizes.fixPadding + 5.0,
    marginLeft: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  popularSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  recentlyPalyedSongImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  forYouInfoWrapStyle: {
    marginBottom: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  playListImageStyle: {
    alignSelf: "center",
    height: 100,
    borderWidth: 2.0,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  albumImageWrapStyle: {
    alignSelf: "center",
    backgroundColor: Colors.whiteColor,
    borderWidth: 2.0,
    borderColor: Colors.lightGrayColor,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  topArtistImageStyle: {
    marginRight: Sizes.fixPadding,
    width: 110,
    height: 100,
    borderRadius: Sizes.fixPadding - 5.0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    padding: 50,
    paddingHorizontal: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default EditAlbumArtistScreen;
