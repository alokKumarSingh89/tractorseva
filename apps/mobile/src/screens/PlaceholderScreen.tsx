import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ArrowLeft } from "lucide-react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = {
  title: string;
  onBack: () => void;
};

export function PlaceholderScreen({ title, onBack }: Props) {
  return (
    <View style={styles.screen}>
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="वापस जाएं"
        style={styles.back}
      >
        <ArrowLeft size={26} color={colors.primaryDark} />
        <Text style={styles.backText}>वापस</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>यह सुविधा अगले चरण में बनाई जाएगी।</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    gap: spacing.sm,
  },
  backText: {
    fontSize: 17,
    color: colors.primaryDark,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    marginTop: spacing.xl,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
