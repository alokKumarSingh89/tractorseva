import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowLeft, Construction } from "lucide-react-native";

import { colors } from "../theme/colors";
import { fonts } from "../theme/fonts";
import { radius, spacing } from "../theme/spacing";

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
        <ArrowLeft size={24} color={colors.text} />
        <Text style={styles.backText}>वापस</Text>
      </Pressable>

      <View style={styles.center}>
        <View style={styles.icon}>
          <Construction size={36} color={colors.primary} />
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          यह सुविधा अगले चरण में उपलब्ध होगी।
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  back: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  backText: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.text,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: spacing.xxxl,
  },
  icon: {
    width: 84,
    height: 84,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: fonts.semibold,
    fontSize: 22,
    lineHeight: 36,
    color: colors.text,
    textAlign: "center",
  },
  description: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 25,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});
