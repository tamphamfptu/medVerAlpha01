import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useGetGenreList } from "../../hooks/genre.hook";
import { useDispatch } from "react-redux";
import { genreArtistAction } from "../../redux/other/genreArtist.slice";
import { Navigate } from "../../constants/navigate";

const { width } = Dimensions.get("window");

let musicsList = [];

const SelectGenreArtistScreen = ({ navigation }) => {
  const { data, error, isSuccess, isError } = useGetGenreList();
  const dispatch = useDispatch();
  if (isSuccess) {
    musicsList = data["data"];
  }
  if (isError) {
    console.log("error", error);
  }

  const handleSelect = () => {
    dispatch(genreArtistAction.storeGenreArtistId(selectedGenreIds));
    navigation.push(Navigate.CREATE_AUDIO_ARTIST);
  };

  const [state, setState] = useState({
    musicsData: [],
  });

  useEffect(() => {
    setState({ musicsData: musicsList });
  }, [musicsList]);

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { musicsData } = state;

  const selectedGenreIds = musicsData
    .filter((item) => item.selected === true)
    .map((item) => item.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <>
              {cornerImage()}
              {skipAndNextText()}
              {chooseMusicTitle()}
              {musics()}
            </>
          }
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    </SafeAreaView>
  );

  function updateMusics({ id }) {
    const newList = musicsData?.map((item) => {
      ({ ...item, selected: false });
      if (item?.id === id) {
        const updatedItem = { ...item, selected: !item.selected };
        return updatedItem;
      }
      return item;
    });
    updateState({ musicsData: newList });
  }

  function musics() {
    const renderItem = ({ item, index }) => (
      <View
        style={{
          alignItems: "center",
          marginLeft: index % 3 == 0 ? Sizes.fixPadding * 2.0 : 0.0,
          marginRight: index % 3 == 2 ? Sizes.fixPadding * 2.0 : 0.0,
          marginBottom: Sizes.fixPadding * 2.5,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          style={item.selected ? styles.selectedItem : styles.item}
          onPress={() => {
            updateMusics({ id: item?.id });
            // handleGenrePress(item.id);
            // createFavorite();
          }}
        >
          <ImageBackground
            source={{ uri: `${item.image}` }}
            style={{
              width: width / 3.6,
              height: width / 3.6,
            }}
            borderRadius={width / 3.6 / 2.0}
          >
            {item.selected ? (
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  width: width / 3.6,
                  height: width / 3.6,
                  borderRadius: width / 3.6 / 2.0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="check"
                  color={Colors.whiteColor}
                  size={25}
                />
              </View>
            ) : null}
          </ImageBackground>
        </TouchableOpacity>

        {item.selected ? (
          <MaskedView
            style={{ width: width / 3.6, height: 18 }}
            maskElement={
              <Text
                style={{
                  marginTop: Sizes.fixPadding - 8.0,
                  textAlign: "center",
                  ...Fonts.blackColor14SemiBold,
                }}
              >
                {item.name}
              </Text>
            }
          >
            <LinearGradient
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: Sizes.fixPadding - 8.0,
                  color: "transparent",
                }}
              >
                {item.name}
              </Text>
            </LinearGradient>
          </MaskedView>
        ) : (
          <Text
            style={{
              textAlign: "center",
              marginTop: Sizes.fixPadding - 8.0,
              ...Fonts.blackColor14SemiBold,
            }}
          >
            {item.name}
          </Text>
        )}
      </View>
    );
    return (
      <FlatList
        scrollEnabled={false}
        data={musicsData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      />
    );
  }

  function chooseMusicTitle() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding,
          marginBottom: Sizes.fixPadding * 3.5,
        }}
      >
        <Image
          source={require("../../assets/images/music-note.png")}
          style={{
            marginBottom: Sizes.fixPadding,
            alignSelf: "center",
            width: 30.0,
            height: 30.0,
          }}
          resizeMode="contain"
        />
        <MaskedView
          style={{ height: 22 }}
          maskElement={
            <Text style={{ textAlign: "center", ...Fonts.blackColor18Bold }}>
              Choose Music That Interests You...
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
      </View>
    );
  }

  function skipAndNextText() {
    return (
      <View style={styles.skipAndNextTextWrapStyle}>
        <Text
          onPress={() => {
            handleSelect();
          }}
          style={{ ...Fonts.grayColor15Medium }}
        >
          Next
        </Text>
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
  skipAndNextTextWrapStyle: {
    flexDirection: "row",
    marginTop: Sizes.fixPadding - 30.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default SelectGenreArtistScreen;
