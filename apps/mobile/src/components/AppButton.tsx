import { Pressable, StyleSheet, Text, View } from "react-native";
import { Mic, PenLine } from "lucide-react-native";
import { colors } from "../theme/colors";
import { radius, spacing } from "../theme/spacing";

type Props = {
  title: string;
  subtitle?: string;
  icon?: "mic" | "edit";
  variant?: "primary" | "secondary";
  onPress: () => void;
};

export function AppButton({
  title,
  subtitle,
  icon,
  variant = "primary",
  onPress,
}: Props) {
  const primary = variant === "primary";
  const foreground = primary ? colors.white : colors.primaryDark;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        primary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.icon}>
        {icon === "mic" && <Mic size={30} color={foreground} />}
        {icon === "edit" && <PenLine size={28} color={foreground} />}
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: foreground }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: foreground }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 88,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryLight,
  },
  pressed: {
    opacity: 0.85,
  },
  icon: {
    width: 42,
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
});
