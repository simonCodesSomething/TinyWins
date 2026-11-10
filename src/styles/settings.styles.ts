
import { StyleSheet } from "react-native";
import { theme } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },

  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text,
    marginTop: 12,
  },

  subtitle: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginTop: 8,
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: theme.colors.textSecondary,
    marginBottom: 14,
  },

  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 12,
  },

  habitNumber: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: theme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  habitNumberText: {
    fontWeight: "700",
    color: theme.colors.primary,
    fontSize: 16,
  },

  habitRowContent: {
    flex: 1,
  },

  habitName: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text,
  },

  habitHint: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },

  helpText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginTop: 12,
  },

  version: {
    textAlign: "center",
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 32,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(15,23,42,0.5)",
  },

  modalCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    padding: 24,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: theme.colors.text,
  },

  modalSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 8,
    marginBottom: 20,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },

  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },

  cancelButtonText: {
    color: theme.colors.text,
    fontWeight: "700",
  },

  saveButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
