import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CalendarDays,
  Wallet,
  CheckCircle2,
  Clock3,
} from "lucide-react-native";

import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { radius, spacing } from "../theme/spacing";

type Props = {
  title: string;
  value: string;
  icon?: "calendar" | "wallet" | "check" | "clock";
  variant?: "normal" | "warning" | "success";
};

export function StatCard({
  title,
  value,
  icon = "wallet",
  variant = "normal",
}: Props) {
  const accent = variant === "warning" ? colors.warning : colors.primary;

  const Icon =
    icon === "calendar"
      ? CalendarDays
      : icon === "check"
        ? CheckCircle2
        : icon === "clock"
          ? Clock3
          : Wallet;

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Icon size={20} color={accent} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <Text
        style={[
          styles.value,
          variant === "warning" && {
            color: colors.warning,
          },
        ]}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    minHeight: 116,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    justifyContent: "space-between",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: 23,
    lineHeight: 34,
    color: colors.text,
    fontVariant: ["tabular-nums"],
  },
});
