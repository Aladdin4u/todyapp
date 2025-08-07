import { useSession } from "@/utils/ctx";
import { SplashScreen } from "expo-router";

export function SplashScreenController() {
  const { isLoading } = useSession();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
