import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import "react-native-reanimated";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  const [loaded] = useFonts({
    SFPROBold: require("../assets/fonts/SFPRODISPLAYBOLD.otf"),
    SFPROMedium: require("../assets/fonts/SFPRODISPLAYMEDIUM.otf"),
    SFPRORegular: require("../assets/fonts/SFPRODISPLAYREGULAR.otf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.primary,
      error: "#FF486A",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
