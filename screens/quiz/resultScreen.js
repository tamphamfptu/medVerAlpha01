import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { Navigate } from "../../constants/navigate";
import { generateColor } from "../../utils/app.util";
import { ProgressBar } from "react-native-paper";
import { store } from "../../core/store/store";
import { useGetFinishedQuizHistoryApi } from "../../hooks/question.hook";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
const ResultScreen = ({ navigation }) => {
  const userId = useSelector((state) => state.user.data.id);
  let quizResult;

  const {
    data: quizHistoryData,
    isSuccess: isSuccessQuizHistory,
    isError: isErrorQuizHistory,
    error: errorQuizHistory,
  } = useGetFinishedQuizHistoryApi(userId);

  let feeling = store.getState().question.result;
  let feelingFilter = feeling.filter((e) => {
    return e.point !== 0;
  });

  if (isSuccessQuizHistory) {
    quizResult = quizHistoryData;
  }
  if (isErrorQuizHistory) {
    console.log("Cannot get quiz history", errorQuizHistory);
  }
  const data = feelingFilter?.map((e, index) => {
    return {
      id: index + 1,
      value: e.point * 0.01,
      color: generateColor(),
      type:
        e.mentalHealth?.charAt(0).toUpperCase() +
        e.mentalHealth?.slice(1).toLowerCase(),
      percentage: e.point?.toFixed(2),
    };
  });

  const progressQuiz = () => {
    return (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 10,
          marginTop: 8,
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "450",
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                Quiz Result
              </Text>
            </View>
            <View
              style={{
                marginBottom: Sizes.fixPadding * 2,
                paddingHorizontal: 12,
              }}
            >
              {data?.map((e) => (
                <View key={e.id} style={styles.progressBar}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "400" }}>
                      {e.type}
                    </Text>
                    <Text
                      style={{ fontSize: 14, fontWeight: "400", marginTop: 4 }}
                    >
                      {e.percentage}%
                    </Text>
                  </View>
                  <View>
                    <ProgressBar
                      style={{ height: 20, borderRadius: 8, marginTop: 4 }}
                      progress={e.value}
                      color={e.color}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onPressHandler = () => {
    navigation.push(Navigate.RECOMMENDED_GENRE);
  };

  const quizHistory = () => {
    return (
      <View
        style={{
          backgroundColor: "#eeeeee",
          borderRadius: 10,
        }}
      >
        <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
          <View style={{ backgroundColor: "white", borderRadius: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 8,
              }}
            >
              <AntDesign name="medicinebox" size={24} color="black" />
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "left",
                  marginLeft: 8,
                  fontWeight: "450",
                  paddingVertical: 8,
                }}
              >
                Quiz History
              </Text>
            </View>

            {quizResult ? (
              // Render the list of quizzes if quizResult has data
              quizResult.slice(0, 5).map((e) => (
                <TouchableOpacity
                  key={e.quizId}
                  style={{
                    borderTopWidth: 0.5,
                    borderColor: "grey",
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                  }}
                  onPress={() => {
                    navigation.push(Navigate.RESULT_HISTORY_DETAIL, {
                      e,
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>
                      Symptoms:
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: 2 }}>
                      {e.mentalHealth.toString()}
                    </Text>
                  </View>
                  <View style={{ marginTop: 4 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#aaa",
                        fontStyle: "italic",
                      }}
                    >
                      Created At: {moment(e.createdDate).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              // Render the "No data" text if quizResult is empty
              <Text
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "450",
                  paddingVertical: 8,
                }}
              >
                No data
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      <View>
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
            {progressQuiz()}
            {quizHistory()}
            {doneResultBtn()}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  function doneResultBtn() {
    return (
      <Pressable
        style={styles.doneQuizButtonStyle}
        activeOpacity={0.9}
        onPress={() => {
          onPressHandler();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 3 }}
          end={{ x: 0, y: 2 }}
          colors={["rgba(255, 124, 0,1)", "rgba(41, 10, 89, 0.9)"]}
          style={styles.doneQuizGradientStyle}
        >
          <Text style={{ ...Fonts.whiteColor16Bold }}>Enjoy</Text>
        </LinearGradient>
      </Pressable>
    );
  }
};
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
const styles = StyleSheet.create({
  progressBar: {
    marginTop: 12,
  },
  resultInfo: {
    paddingVertical: Sizes.fixPadding + 50.0,
    marginHorizontal: Sizes.fixPadding + 10.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 40.0,
  },
  resultInfoStyle: {
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding,
    ...Fonts.whiteColor18Bold,
    textAlign: "center",
  },

  logo: {
    width: 80,
    height: 70,
    tintColor: "white",
  },

  doneQuizButtonStyle: {
    justifyContent: "center",
    marginTop: 16,
    marginHorizontal: Sizes.fixPadding * 10.0,
    borderRadius: Sizes.fixPadding - 4.0,
  },
  doneQuizGradientStyle: {
    paddingVertical: Sizes.fixPadding + 3.0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Sizes.fixPadding + 20.0,
  },
});

export default ResultScreen;
