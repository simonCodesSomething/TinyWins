import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { TabName } from "../types/tabs";
import { styles } from "../styles/bottomTabs.styles";
import { theme } from "../constants/theme";

type Props = {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
};

const tabs = [
  {
    id: "today",
    label: "Today",
    icon: "checkbox-outline",
    activeIcon: "checkbox",
  },
  {
    id: "progress",
    label: "Progress",
    icon: "stats-chart-outline",
    activeIcon: "stats-chart",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings-outline",
    activeIcon: "settings",
  },
] as const;

export default function BottomTabs({
  activeTab,
  onTabChange,
}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
            style={styles.tab}
            onPress={() => onTabChange(tab.id)}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={
                isActive
                  ? theme.colors.primary
                  : theme.colors.textSecondary
              }
            />

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}