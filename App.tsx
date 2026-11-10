import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import BottomTabs from "./src/components/BottomTabs";

import TodayScreen from "./src/screens/TodayScreen";
import ProgressScreen from "./src/screens/ProgressScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

import { TabName } from "./src/types/tabs";
import { theme } from "./src/constants/theme";

export default function App() {
  const [activeTab, setActiveTab] =
    useState<TabName>("today");

  function renderTabScreen() {
    switch (activeTab) {
      case "today":
        return <TodayScreen />;

      case "progress":
        return <ProgressScreen />;

      case "settings":
        return <SettingsScreen />;

      default:
        return <TodayScreen />;
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

<View style={styles.content}>
  {renderTabScreen()}
</View>

<BottomTabs
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    flex: 1,
  },
});