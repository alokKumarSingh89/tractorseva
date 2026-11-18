import { StyleSheet, Text, View } from "react-native";
import { radius, spacing } from "../theme/spacing";
import { colors } from "../theme/colors";

type Props = {
  title: string;
  value: string;
  variant?: "normal" | "warning";
};

export function StatCard({ title, value, variant = "normal" }: Props) {
  const warning = variant === "warning";
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: warning ? colors.warningLight : colors.primaryLight,
        },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text
        style={[
          styles.value,
          {
            color: warning ? colors.warning : colors.primaryDark,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 116,
    padding: spacing.lg,
    borderRadius: radius.lg,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  value: {
    fontSize: 24,
    fontWeight: "800",
  },
});
