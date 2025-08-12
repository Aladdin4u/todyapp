import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.row}>
        <View>
          <ThemedText type="defaultSemiBold">Today</ThemedText>
          <ThemedText
            type="subtitle"
            style={{ color: Colors.neutral.secondary }}
          >
            Best platform for creating to-do lists
          </ThemedText>
        </View>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/setting.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader} />
        <View style={styles.cardContent}>
          <View style={[styles.cardRow, { gap: 12 }]}>
            <Ionicons name="add" size={24} style={styles.cardIcon} />
            <ThemedText>Tap plus to create a new task</ThemedText>
          </View>
          <View style={[styles.cardRow, styles.cardBottom]}>
            <ThemedText style={styles.cardText}>Add your task</ThemedText>
            <ThemedText style={styles.cardText}>
              Today . Mon 20 Jul 2022
            </ThemedText>
          </View>
        </View>
      </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  card: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: "#0F163A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
  },
  cardHeader: {
    height: 36,
    backgroundColor: Colors.primary,
  },
  cardContent: {
    padding: 14,
    gap: 24,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    color: Colors.white,
  },
  cardBottom: {
    justifyContent: "space-between",
    borderTopWidth: 0.4,
    borderTopColor: "#E0E5ED",
    paddingTop: 5,
  },
  cardText: {
    color: Colors.neutral.secondary,
  },
});
