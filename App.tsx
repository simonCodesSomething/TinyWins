
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import BottomTabs from "./src/components/BottomTabs";
import WelcomeModal from "./src/components/WelcomeModal";

import TodayScreen from "./src/screens/TodayScreen";
import ProgressScreen from "./src/screens/ProgressScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

import { TabName } from "./src/types/tabs";
import { theme } from "./src/constants/theme";
import { useSettingsStore } from "./src/store/settingsStore";

export default function App() {
  const [activeTab, setActiveTab] =
    useState<TabName>("today");

  const onboardingCompleted = useSettingsStore(
    (state) => state.onboardingCompleted
  );

  const setOnboardingCompleted = useSettingsStore(
    (state) => state.setOnboardingCompleted
  );

  const [settingsReady, setSettingsReady] = useState(
    () => useSettingsStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsubscribe =
      useSettingsStore.persist.onFinishHydration(() => {
        setSettingsReady(true);
      });

    if (useSettingsStore.persist.hasHydrated()) {
      setSettingsReady(true);
    }

    return unsubscribe;
  }, []);

  const renderTabScreen = () => {
    switch (activeTab) {
      case "today":
        return <TodayScreen />;

      case "progress":
        return <ProgressScreen />;

      case "settings":
        return <SettingsScreen />;
    }
  };

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

        <WelcomeModal
          visible={
            settingsReady && !onboardingCompleted
          }
          onContinue={() =>
            setOnboardingCompleted(true)
          }
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
