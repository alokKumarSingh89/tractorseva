import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Tractor, ArrowRight, WifiOff, UserRound } from "lucide-react-native";

import { AppButton } from "../../components/AppButton";
import { StatCard } from "../../components/StatCard";
import { colors } from "../../theme/colors";
import { fonts } from "../../theme/fonts";
import { radius, spacing } from "../../theme/spacing";

import {
  calculateDashboard,
  formatRupees,
  sampleRecords,
} from "./dashboard.data";

type Props = {
  onVoiceEntry: () => void;
  onManualEntry: () => void;
  onFarmers: () => void;
  onLedger: () => void;
};

export function DashboardScreen({
  onVoiceEntry,
  onManualEntry,
  onFarmers,
  onLedger,
}: Props) {
  // Demo date matches the Lesson 01 sample records.
  const stats = calculateDashboard(sampleRecords, "2026-11-17");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.brandIcon}>
          <Tractor size={24} color={colors.onPrimary} />
        </View>

        <View style={styles.brandContent}>
          <Text style={styles.brandName}>TractorSeva</Text>
          <Text style={styles.brandSubtitle}>काम और भुगतान प्रबंधन</Text>
        </View>

        <View style={styles.avatar}>
          <UserRound size={22} color={colors.primary} />
        </View>
      </View>

      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>नमस्ते! 👋</Text>
        <Text style={styles.greetingSubtitle}>
          आज किस काम का हिसाब जोड़ना है?
        </Text>
      </View>

      <View style={styles.actions}>
        <AppButton
          title="बोलकर काम जोड़ें"
          subtitle="अपनी भाषा में बताएं"
          icon="mic"
          onPress={onVoiceEntry}
        />

        <AppButton
          title="लिखकर काम जोड़ें"
          icon="edit"
          variant="secondary"
          onPress={onManualEntry}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle} numberOfLines={1}>
          काम का सारांश
        </Text>
        <Text style={styles.demoLabel}>उदाहरण डेटा</Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="आज के काम"
          value={`${stats.todayJobs}`}
          icon="calendar"
        />

        <StatCard
          title="बाकी पैसा"
          value={formatRupees(stats.pendingPaise)}
          icon="clock"
          variant="warning"
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle} numberOfLines={1}>
          हाल के काम
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onLedger}
          style={styles.seeAll}
        >
          <Text style={styles.seeAllText}>हिसाब देखें</Text>
          <ArrowRight size={17} color={colors.primary} />
        </Pressable>
      </View>

      {sampleRecords.slice(0, 3).map((record) => {
        const due = Math.max(0, record.amountPaise - record.receivedPaise);

        return (
          <View key={record.id} style={styles.workRow}>
            <View style={styles.workIcon}>
              <Tractor size={21} color={colors.primary} />
            </View>

            <View style={styles.workDetails}>
              <Text style={styles.workType}>{record.workType}</Text>
              <Text style={styles.workFarmer}>{record.farmerName}</Text>
            </View>

            <View style={styles.workAmount}>
              <Text style={styles.amount}>
                {formatRupees(record.amountPaise)}
              </Text>
              <Text
                style={[
                  styles.status,
                  {
                    color: due > 0 ? colors.warning : colors.success,
                  },
                ]}
              >
                {due > 0 ? `बाकी ${formatRupees(due)}` : "पूरा भुगतान"}
              </Text>
            </View>
          </View>
        );
      })}

      <Pressable
        style={styles.farmerShortcut}
        accessibilityRole="button"
        onPress={onFarmers}
      >
        <View style={styles.farmerShortcutIcon}>
          <UserRound size={23} color={colors.primary} />
        </View>
        <View style={styles.shortcutText}>
          <Text style={styles.shortcutTitle}>मेरे किसान</Text>
          <Text style={styles.shortcutSubtitle}>
            किसान जोड़ें और जानकारी देखें
          </Text>
        </View>
        <ArrowRight size={20} color={colors.primary} />
      </Pressable>

      <View style={styles.offlineInfo}>
        <WifiOff size={17} color={colors.textSecondary} />
        <Text style={styles.offlineText}>
          किसान की जानकारी बिना इंटरनेट सेव होती है
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginBottom: spacing.md,
    minHeight: 44,
  },

  sectionTitle: {
    flexShrink: 1,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 30,
    color: colors.text,
    includeFontPadding: true,
  },

  demoLabel: {
    flexShrink: 0,
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 20,
    color: colors.textMuted,
  },

  seeAll: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    minHeight: 44,
  },

  seeAllText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 22,
    color: colors.primary,
  },

  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xxxl,
    gap: spacing.md,
  },
  brandIcon: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandContent: {
    flex: 1,
  },
  brandName: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 27,
    color: colors.text,
  },
  brandSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    marginBottom: spacing.xl,
  },
  greetingTitle: {
    fontFamily: fonts.semibold,
    fontSize: 24,
    lineHeight: 36,
    color: colors.text,
  },
  greetingSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 27,
    color: colors.textSecondary,
  },
  actions: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },

  statsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },

  workRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  workIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  workDetails: {
    flex: 1,
    minWidth: 0,
  },
  workType: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 24,
    color: colors.text,
  },
  workFarmer: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  workAmount: {
    alignItems: "flex-end",
  },
  amount: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 25,
    color: colors.text,
  },
  status: {
    fontFamily: fonts.medium,
    fontSize: 11,
    lineHeight: 20,
  },
  farmerShortcut: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryContainer,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  farmerShortcutIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutText: {
    flex: 1,
  },
  shortcutTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 25,
    color: colors.onPrimaryContainer,
  },
  shortcutSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 21,
    color: colors.onPrimaryContainer,
  },
  offlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xl,
    justifyContent: "center",
  },
  offlineText: {
    fontFamily: fonts.regular,
    fontSize: 11,
    lineHeight: 20,
    color: colors.textSecondary,
  },
});
