import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Mic, PenLine, Plus, Check, ArrowRight } from "lucide-react-native";

import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { radius, spacing } from "../theme/spacing";

type ButtonIcon = "mic" | "edit" | "plus" | "check" | "arrow";

type Props = {
  title: string;
  subtitle?: string;
  icon?: ButtonIcon;
  variant?: "primary" | "secondary" | "outlined";
  disabled?: boolean;
  onPress: () => void;
};

export function AppButton({
  title,
  subtitle,
  icon,
  variant = "primary",
  disabled = false,
  onPress,
}: Props) {
  const isPrimary = variant === "primary";

  const foreground = isPrimary ? colors.onPrimary : colors.primary;

  function renderIcon() {
    const iconProps = {
      size: 24,
      color: foreground,
      strokeWidth: 2,
    };

    switch (icon) {
      case "mic":
        return <Mic {...iconProps} />;
      case "edit":
        return <PenLine {...iconProps} />;
      case "plus":
        return <Plus {...iconProps} />;
      case "check":
        return <Check {...iconProps} />;
      case "arrow":
        return <ArrowRight {...iconProps} />;
      default:
        return null;
    }
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "outlined" && styles.outlined,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {icon ? <View style={styles.iconContainer}>{renderIcon()}</View> : null}

      <View style={styles.textContainer}>
        <Text
          style={[styles.title, { color: foreground }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            style={[styles.subtitle, { color: foreground }]}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: 64,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacing.md,
  },

  primary: {
    backgroundColor: colors.primary,
  },

  secondary: {
    backgroundColor: colors.primaryContainer,
  },

  outlined: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  textContainer: {
    flex: 1,
    minWidth: 0,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  title: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 28,
    textAlign: "left",
    includeFontPadding: true,
  },

  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 22,
    textAlign: "left",
    includeFontPadding: true,
    opacity: 0.85,
  },

  pressed: {
    opacity: 0.85,
  },

  disabled: {
    opacity: 0.5,
  },
});
