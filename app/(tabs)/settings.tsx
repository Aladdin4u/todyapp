import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/utils/ctx";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const links = [
  {
    id: "1",
    name: "Account",
    icon: require("@/assets/images/Profile.png"),
    screen: "account",
  },
  {
    id: "2",
    name: "Theme",
    icon: require("@/assets/images/magicpen.png"),
    screen: "theme",
  },
  {
    id: "3",
    name: "App Icon",
    icon: require("@/assets/images/medal-star.png"),
    screen: "app-icon",
  },
  {
    id: "4",
    name: "Productivity",
    icon: require("@/assets/images/weight.png"),
    screen: "productivity",
  },
  {
    id: "5",
    name: "Change Mode",
    icon: require("@/assets/images/sun.png"),
    screen: "change-mode",
  },
  {
    id: "6",
    name: "Privacy Policy",
    icon: require("@/assets/images/key.png"),
    screen: "privacy-policy",
  },
  {
    id: "7",
    name: "Help Center",
    icon: require("@/assets/images/message-question.png"),
    screen: "help-center",
  },
  {
    id: "8",
    name: "Log Out",
    icon: require("@/assets/images/logout.png"),
    screen: "help-center",
  },
];

type LinkType = (typeof links)[0];

export default function SettingScreen() {
  const { session, signOut } = useSession();
  const user = JSON.parse(session!);

  const LinkList = ({ item }: { item: LinkType }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(true);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const handleClick = (item: LinkType) => {
      if (item.id === "8") {
        signOut();
      }
    };

    return (
      <TouchableOpacity style={styles.row} onPress={(e) => handleClick(item)}>
        <View style={styles.cardRow}>
          <Image source={item.icon} style={styles.icon} />
          <ThemedText
            type="subtitle"
            style={{ color: Colors.neutral.secondary, fontSize: 16 }}
          >
            {item.name}
          </ThemedText>
        </View>
        {item.id === "5" ? (
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            style={styles.icon}
          />
        ) : (
          <Ionicons
            name="chevron-forward-outline"
            size={24}
            color={Colors.neutral.secondary}
          />
        )}
      </TouchableOpacity>
    );
  };

  const Header = () => {
    return (
      <View style={styles.profile}>
        <Avatar.Image size={80} source={{ uri: user.image }} />
        <ThemedText type="defaultSemiBold">{`${user.firstName} ${user.lastName}`}</ThemedText>
        <ThemedText type="subtitle" style={{ color: Colors.neutral.secondary }}>
          {user.email}
        </ThemedText>
      </View>
    );
  };

  const HorizonalLine = () => {
    return <View style={styles.horozontalLine} />;
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={links}
        renderItem={({ item }: { item: LinkType }) => <LinkList item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
        ItemSeparatorComponent={(item) => {
          if (item.leadingItem.id === "5") {
            return <HorizonalLine />;
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 24,
    gap: 24,
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  horozontalLine: {
    borderColor: Colors.neutral.secondary,
    borderWidth: 0.3,
    marginVertical: 12,
  },
});
