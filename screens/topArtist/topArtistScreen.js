import React from "react";
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Icon } from "react-native-gradient-icon";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { SharedElement } from "react-navigation-shared-element";
import { Navigate } from "../../constants/navigate";

const popularSongsList = [
  {
    id: "1p",
    image: require("../../assets/images/songsCoverPicks/coverImage18.png"),
    songName: "Tu Hi Yaar Mera",
    lyricsBy: "Arijit Singh,Neha Kakkar",
    plays: "2.5M",
  },
  {
    id: "2p",
    image: require("../../assets/images/songsCoverPicks/coverImage19.png"),
    songName: "Tera Yaar Hoon Main",
    lyricsBy: "Arijit Singh",
    plays: "2.3M",
  },
  {
    id: "3p",
    image: require("../../assets/images/songsCoverPicks/coverImage20.png"),
    songName: "Kalank",
    lyricsBy: "Alia Bhatt,Varun Dhawan,Arijit Singh",
    plays: "2.0M",
  },
  {
    id: "4p",
    image: require("../../assets/images/songsCoverPicks/coverImage18.png"),
    songName: "Tu Hi Yaar Mera",
    lyricsBy: "Arijit Singh,Neha Kakkar",
    plays: "2.5M",
  },
];

const songOptionsList = [
  "Share",
  "Track Details",
  "Add to Playlist",
  "Album",
  "Artist",
  "Set as",
];

const { width } = Dimensions.get("window");

const TopArtistScreen = ({ navigation, route }) => {
  const item = route.params.item;

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
          {artistInfo()}
          {popularSongsInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function popularSongsInfo() {
    const CustomMenu = () => {
      var _menu = null;

      const setMenuRef = (ref) => {
        _menu = ref;
      };

      const hideMenu = () => {
        _menu.hide();
      };

      const showMenu = () => {
        _menu.show();
      };

      return (
        <Menu
          ref={setMenuRef}
          anchor={
            <MaterialIcons
              name="more-vert"
              color={Colors.grayColor}
              size={24}
              onPress={showMenu}
            />
          }
          onRequestClose={hideMenu}
          style={{
            paddingTop: Sizes.fixPadding,
            backgroundColor: Colors.whiteColor,
          }}
        >
          {songOptionsList.map((item, index) => (
            <View key={`${index}`}>
              <MenuItem
                pressColor="transparent"
                style={{ height: 30.0 }}
                textStyle={{
                  marginRight: Sizes.fixPadding * 5.0,
                  ...Fonts.blackColor12SemiBold,
                }}
                onPress={hideMenu}
              >
                {item}
              </MenuItem>
            </View>
          ))}
        </Menu>
      );
    };

    return (
      <View>
        <Text
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginBottom: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor15Bold,
          }}
        >
          Popular Songs
        </Text>
        {popularSongsList.map((item) => (
          <View key={`${item.id}`}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.push(Navigate.NOW_PLAYING, { item })}
              style={styles.popularSongsInfoWrapStyle}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <SharedElement id={item.id}>
                  <Image
                    source={item.image}
                    style={{
                      width: 100.0,
                      height: 100.0,
                      borderRadius: Sizes.fixPadding - 5.0,
                    }}
                  />
                </SharedElement>
                <View style={{ marginLeft: Sizes.fixPadding }}>
                  <Text style={{ ...Fonts.blackColor14Bold }}>
                    {item.songName}
                  </Text>
                  <Text
                    style={{
                      maxWidth: width / 2.0,
                      marginVertical: Sizes.fixPadding - 7.0,
                      ...Fonts.grayColor11Medium,
                    }}
                  >
                    (LYRICS) | {item.lyricsBy}
                  </Text>
                  <Text style={{ ...Fonts.grayColor11Medium }}>
                    {item.plays} plays
                  </Text>
                </View>
              </View>
              <CustomMenu />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  function artistInfo() {
    return (
      <View style={{ marginVertical: Sizes.fixPadding, alignItems: "center" }}>
        <View>
          <SharedElement id={item.id}>
            <Image
              source={item.image}
              style={{
                width: 180.0,
                height: 180.0,
                borderRadius: Sizes.fixPadding - 5.0,
              }}
            />
          </SharedElement>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 7.0,
              ...Fonts.blackColor15Bold,
            }}
          >
            {item.artistName}
          </Text>
          <Text style={{ ...Fonts.grayColor11Medium }}>Artist</Text>
        </View>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.pop()}>
          <Icon
            size={30}
            mode="linear"
            colors={[
              { color: Colors.primaryColor, offset: "0.15", opacity: "0.75" },
              { color: Colors.secondaryColor, offset: "1", opacity: "0.8" },
            ]}
            style={{
              marginRight: Sizes.fixPadding - 5.0,
              marginTop: Sizes.fixPadding - 5.0,
              alignSelf: "center",
            }}
            name="keyboard-arrow-left"
            type="material"
          />
        </TouchableOpacity>
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Top Artist</Text>}
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
  headerWrapStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding - 40.0,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  popularSongsInfoWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default TopArtistScreen;
