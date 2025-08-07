import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Button } from "react-native-paper";

const slides = [
  {
    key: 1,
    title: "Todyapp",
    text: "The best to do list application for you",
    image: require("@/assets/images/onboarding-logo.png"),
    bg: Colors.primary,
    titleColor: Colors.white,
    textColor: Colors.white,
    imageWidth: 68,
    imageHeight: 68,
  },
  {
    key: 2,
    title: "Your convenience in\nmaking a todo list",
    text: "Here's a mobile platform that helps you create task\nor to list so that it can help you in every job\neasier and faster.\n",
    image: require("@/assets/images/onboarding-screen-2.png"),
    bg: Colors.white,
    titleColor: Colors.neutral.primary,
    textColor: Colors.neutral.secondary,
    imageWidth: 350,
    imageHeight: 390,
  },
  {
    key: 3,
    title: "Find the practicality in\nmaking your todo list",
    text: "Easy-to-understand user interface  that makes you\nmore comfortable when you want to create a task or\nto do list, Todyapp can also improve productivity",
    image: require("@/assets/images/onboarding-screen-3.png"),
    bg: Colors.white,
    titleColor: Colors.neutral.primary,
    textColor: Colors.neutral.secondary,
    imageWidth: 350,
    imageHeight: 390,
  },
];

type Item = (typeof slides)[0];

export default function IntroScreen() {
  const [index, setIndex] = useState(0);
  const isFirstScreen = index === 0; 

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <View style={[{ backgroundColor: item.bg }, styles.slide]}>
        <Image
          source={item.image}
          style={{ width: item.imageWidth, height: item.imageHeight }}
        />
        <View style={item.key === 1 ? {} : styles.desc}>
          <ThemedText
            type="title"
            style={[styles.title, { color: item.titleColor }]}
          >
            {item.title}
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={[styles.text, { color: item.textColor }]}
          >
            {item.text}
          </ThemedText>
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
        <ThemedText style={styles.skipText}>Skip</ThemedText>
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
    console.log("done");
  };
  
  const styles = StyleSheet.create({
    buttonNext: {
      borderRadius: 16,
    },
    desc: {
      textAlign: "center",
      position: "absolute",
      top: 410,
    },
    title: {
      textAlign: "center",
      marginBottom: 10,
    },
    text: {
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
      fontWeight: 500,
      color: Colors.primary,
    },
    activeDotStyle: {
      width: 25,
      height: 8,
      opacity: 1,
      borderRadius: 8,
      backgroundColor: isFirstScreen ? Colors.secondary : Colors.primary,
      top: isFirstScreen ? -150 : 0,
    },
    dotStyle: {
      backgroundColor: Colors.secondary,
      top: isFirstScreen ? -150 : 0,
    },
    dotStyleFirst: {
      backgroundColor: Colors.secondary,
      top: -50,
    },
  });

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
        onSlideChange={(index) => setIndex(index)}
        showNextButton={isFirstScreen ? false : true}
      />
    </View>
  );
}
