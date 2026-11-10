import { StyleSheet } from "react-native";
import { theme } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    height: 60,
    paddingTop: 6,
    paddingBottom: 4,
    elevation: 0,
    shadowOpacity: 0,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  label: {
    fontSize: 11,
    fontWeight: "500",
    color: theme.colors.textSecondary,
  },

  activeLabel: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});