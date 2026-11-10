import { View, Text } from "react-native";
import { styles } from "../styles/progress.styles";

export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <Text style={styles.subtitle}>
        Every small win adds up.
      </Text>
    </View>
  );
}