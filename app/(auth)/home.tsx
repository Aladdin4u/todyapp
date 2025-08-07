import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Image } from "expo-image";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthHomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedText type="defaultSemiBold">
        Welcome to <Text style={styles.text}>Todyapp</Text>
      </ThemedText>
      <Image
        source={require("@/assets/images/onboarding-create.png")}
        style={styles.image}
      />

      <Button
        icon={() => (
          <Image
            source={require("@/assets/images/message.png")}
            style={styles.icon}
          />
        )}
        mode="contained"
        style={[styles.button, { width: "100%" }]}
        onPress={() => router.navigate("/(auth)/login")}
      >
        Continue with email
      </Button>

      <View style={styles.row}>
        <View style={styles.border}></View>
        <ThemedText type="subtitle" style={{ color: Colors.neutral.secondary }}>
          or continue with
        </ThemedText>
        <View style={styles.border}></View>
      </View>

      <View style={styles.row}>
        <Button
          icon={() => (
            <Image
              source={require("@/assets/images/facebook.png")}
              style={styles.icon}
            />
          )}
          mode="contained"
          textColor={Colors.neutral.primary}
          buttonColor={Colors.neutral.light}
          style={[styles.button, { width: "45%" }]}
        >
          Facebook
        </Button>
        <Button
          icon={() => (
            <Image
              source={require("@/assets/images/google.png")}
              style={styles.icon}
            />
          )}
          mode="contained"
          textColor={Colors.neutral.primary}
          buttonColor={Colors.neutral.light}
          style={[styles.button, { width: "45%" }]}
        >
          Google
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 15,
  },
  text: {
    color: Colors.primary,
  },
  image: {
    width: 350,
    height: 400,
  },
  button: {
    borderRadius: 16,
    fontSize: 18,
    padding: 6,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  border: {
    width: 100,
    height: 1,
    backgroundColor: Colors.neutral.secondary,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
