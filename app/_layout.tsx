import { Colors } from "@/constants/Colors";
import { SessionProvider, useSession } from "@/utils/ctx";
import { SplashScreenController } from "@/components/splash";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

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
        <Stack.Protected guard={!session}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={session}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack.Protected>
        <StatusBar style="auto" />
      </Stack>
    </PaperProvider>
  );
}
