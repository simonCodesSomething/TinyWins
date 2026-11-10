
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { theme } from "../constants/theme";

type Props = {
  visible: boolean;
  onContinue: () => void;
};

export default function WelcomeModal({
  visible,
  onContinue,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onContinue}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.icon}>
            <Ionicons
              name="sparkles"
              size={32}
              color={theme.colors.primary}
            />
          </View>

          <Text style={styles.title}>
            Welcome to TinyWins!
          </Text>

          <Text style={styles.subtitle}>
            Three small wins, one better day.
          </Text>

          <View style={styles.steps}>
            <Text style={styles.step}>
              1. Choose three daily habits.
            </Text>

            <Text style={styles.step}>
              2. Check them off as you go.
            </Text>

            <Text style={styles.step}>
              3. Build consistency over time.
            </Text>
          </View>

          <Text style={styles.description}>
            Start with the suggested habits or replace
            them anytime in Settings.
          </Text>

          <Pressable
            style={styles.button}
            onPress={onContinue}
          >
            <Text style={styles.buttonText}>
              Start My TinyWins
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(15,23,42,0.5)",
    padding: 24,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  icon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: theme.colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 8,
    textAlign: "center",
  },
  steps: {
    alignSelf: "stretch",
    gap: 16,
    marginVertical: 28,
  },
  step: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "500",
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
