import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Todo {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
}

type TodosProps = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};
export default function TabTwoScreen() {
  const [todos, setTodos] = useState<TodosProps>();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos");
      const data = await response.json();

      setTodos(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load Todos");
    }
  };

  const Todo = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.card}>
        <FontAwesome5
          name="dot-circle"
          size={24}
          color={item.completed ? Colors.primary : Colors.neutral.secondary}
        />
        <View style={styles.row}>
          <ThemedText
            type="subtitle"
            style={{ fontSize: 16, flexWrap: "wrap" }}
          >
            {item.todo}
          </ThemedText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={todos?.todos}
        renderItem={({ item }: { item: Todo }) => <Todo item={item} />}
        keyExtractor={(item) => item.id}
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 350,
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
