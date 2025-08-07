import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: 1,
    title: "Todyapp",
    text: "The best to do list application for you",
    image: require("@/assets/images/onboarding-logo.png"),
    bg: "#24A19C",
    titleColor: "#FFFFFF",
    textColor: "#FFFFFF",
    imageWidth: 68,
    imageHeight: 68,
  },
  {
    key: 2,
    title: "Your convenience in\nmaking a todo list",
    text: "Here's a mobile platform that helps you create task\nor to list so that it can help you in every job\neasier and faster.\n",
    image: require("@/assets/images/onboarding-screen-2.png"),
    bg: "#FFFFFF",
    titleColor: "#1B1C1F",
    textColor: "#767E8C",
    imageWidth: 350,
    imageHeight: 390,
  },
  {
    key: 3,
    title: "Find the practicality in\nmaking your todo list",
    text: "Easy-to-understand user interface  that makes you\nmore comfortable when you want to create a task or\nto do list, Todyapp can also improve productivity",
    image: require("@/assets/images/onboarding-screen-3.png"),
    bg: "#FFFFFF",
    titleColor: "#1B1C1F",
    textColor: "#767E8C",
    imageWidth: 350,
    imageHeight: 390,
  },
];

type Item = (typeof slides)[0];

export default function IntroScreen() {
  const renderItem = ({ item }: { item: Item }) => {
    return (
      <View style={[{ backgroundColor: item.bg }, styles.slide]}>
        <Image
          source={item.image}
          style={{ width: item.imageWidth, height: item.imageHeight }}
        />
        <View style={item.key === 1 ? {} : styles.desc}>
          <Text style={[styles.title, { color: item.titleColor }]}>
            {item.title}
          </Text>
          <Text style={[styles.text, { color: item.textColor }]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View>
        <Button mode="contained" style={styles.buttonNext}>
          Continue
        </Button>
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <View style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View>
        <Button mode="contained" style={styles.buttonNext}>
          Continue
        </Button>
      </View>
    );
  };

  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    console.log('done');
    
  };
  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderSkipButton={renderSkipButton}
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        showSkipButton={true}
        bottomButton={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonNext: {
    // width: "100%",
    borderRadius: 16,
    // justifyContent: "center",
    // alignItems: "center",
  },
  desc: {
    textAlign: "center",
    position: "absolute",
    top: 410,
  },
  title: {
    fontFamily: "SFPROMedium",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontFamily: "SFPRORegular",
    fontSize: 14,
    textAlign: "center",
  },
  image: {
    marginBottom: 4,
  },

  slide: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  skip: {
    flex: 1,
    position: "absolute",
    top: -568,
    right: 0,
  },
  skipText: {
    fontFamily: "SFPRORegular",
    fontSize: 16,
    fontWeight: 500,
    color: "#24A19C",
  },
  activeDotStyle: {
    width: 25,
    height: 8,
    opacity: 1,
    borderRadius: 8,
    backgroundColor: "#24A19C",
  },
  dotStyle: {
    backgroundColor: "#CBF1F0",
  },
});
