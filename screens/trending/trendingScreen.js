import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Menu, MenuItem } from "react-native-material-menu";
import { SharedElement } from "react-navigation-shared-element";
import { Navigate } from "../../constants/navigate";

const { width } = Dimensions.get("window");

const trendingCategoriesList = ["ALL", "HIP-HOP", "PODCASTS"];

const songOptionsList = [
  "Share",
  "Track Details",
  "Add to Playlist",
  "Album",
  "Artist",
  "Set as",
];

const topTrendingsList = [
  {
    id: "1",
    image: require("../../assets/images/songsCoverPicks/coverImage5.png"),
    songName: "Shape of you",
    artist: "Ed shreean",
    plays: "2.5M",
  },
  {
    id: "2",
    image: require("../../assets/images/songsCoverPicks/coverImage6.png"),
    songName: "Waka waka",
    artist: "Shakira",
    plays: "2.2M",
  },
  {
    id: "3",
    image: require("../../assets/images/songsCoverPicks/coverImage7.png"),
    songName: "Let her go",
    artist: "Passenger",
    plays: "2.0M",
  },
  {
    id: "4",
    image: require("../../assets/images/songsCoverPicks/coverImage8.png"),
    songName: "See you again",
    artist: "Wiz khalifa",
    plays: "1.5M",
  },
  {
    id: "5",
    image: require("../../assets/images/songsCoverPicks/coverImage9.png"),
    songName: "Preety Girl",
    artist: "Maggie Lindemann",
    plays: "1.0M",
  },
];

const TrendingScreen = ({ navigation }) => {
  const [state, setState] = useState({
    selectedCategory: trendingCategoriesList[0],
  });

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const { selectedCategory } = state;

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
          {trendingCategories()}
          {topTrendingInfo()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function topTrendingInfo() {
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
              size={22}
              onPress={showMenu}
            />
          }
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
            marginBottom: Sizes.fixPadding + 5.0,
            marginHorizontal: Sizes.fixPadding * 2.0,
            ...Fonts.blackColor15Bold,
          }}
        >
          Top Trending 2020
        </Text>
        {topTrendingsList.map((item, index) => (
          <View key={`${item.id}`}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.push(Navigate.NOW, { item })}
              style={styles.topTrendingInfoWrapStyle}
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
                  <LinearGradient
                    start={{ x: 0, y: 0.1 }}
                    end={{ x: 0, y: 1 }}
                    colors={["rgba(255, 124, 0,0.9)", "rgba(41, 10, 89, 1)"]}
                    style={styles.songNumberWrapStyle}
                  >
                    <Text style={{ ...Fonts.whiteColor9Medium }}>
                      #{index + 1}
                    </Text>
                  </LinearGradient>
                  <Text
                    style={{
                      marginTop: Sizes.fixPadding - 5.0,
                      marginBottom: Sizes.fixPadding - 9.0,
                      ...Fonts.blackColor14Bold,
                    }}
                  >
                    {item.songName}
                  </Text>
                  <Text
                    style={{
                      maxWidth: width / 2.0,
                      ...Fonts.grayColor11Medium,
                    }}
                  >
                    {item.artist}
                  </Text>
                  <View
                    style={{
                      marginTop: Sizes.fixPadding,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="play-circle-fill"
                      size={13}
                      color="black"
                    />
                    <Text
                      style={{
                        marginLeft: Sizes.fixPadding - 5.0,
                        ...Fonts.grayColor10Medium,
                      }}
                    >
                      {item.plays} plays
                    </Text>
                  </View>
                </View>
              </View>
              <CustomMenu />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  function trendingCategories() {
    return (
      <View style={styles.trendingCategoriesWrapStyle}>
        {trendingCategoriesList.map((item, index) => (
          <View style={{ flex: 1 }} key={`${index}`}>
            {selectedCategory == item ? (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedCategory: item })}
              >
                <LinearGradient
                  key={`${index}`}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 1)"]}
                  style={{
                    marginRight:
                      trendingCategoriesList.length - 1 == index
                        ? 0.0
                        : Sizes.fixPadding,
                    ...styles.trendingCategoriesStyle,
                  }}
                >
                  <Text numberOfLines={1} style={{ ...Fonts.whiteColor15Bold }}>
                    {item}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedCategory: item })}
                style={{
                  ...styles.trendingCategoriesStyle,
                  backgroundColor: "#E8E8E8",
                  marginRight:
                    trendingCategoriesList.length - 1 == index
                      ? 0.0
                      : Sizes.fixPadding,
                }}
              >
                <Text numberOfLines={1} style={{ ...Fonts.grayColor15Bold }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
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
        <MaskedView
          style={{ flex: 1, height: 28 }}
          maskElement={<Text style={{ ...Fonts.bold22 }}>Trending</Text>}
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
  },
  trendingCategoriesWrapStyle: {
    flex: 1,
    marginVertical: Sizes.fixPadding + 5.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  trendingCategoriesStyle: {
    alignItems: "center",
    flex: 1,
    borderRadius: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding - 5.0,
  },
  songNumberWrapStyle: {
    width: 18.0,
    height: 18.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
  },
  topTrendingInfoWrapStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

export default TrendingScreen;
