import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/colors";
import { radius, spacing } from "../../theme/spacing";
import {
  calculateDashboard,
  formatRupees,
  sampleRecords,
} from "./dashboard.data";
import { BookOpen, Tractor, Users } from "lucide-react-native";
import { AppButton } from "../../components/AppButton";
import { StatCard } from "../../components/StatCard";

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
  // Fixed pilot date so demo records are reproducible.
  // Real data will use the device's local work date.
  const stats = calculateDashboard(sampleRecords, "2026-11-17");

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.brand}>
          <Tractor size={30} color={colors.primary} />
          <Text style={styles.brandText}>TractorSeva</Text>
        </View>
        <Text style={styles.greeting}>नमस्ते! 👋</Text>
        <Text style={styles.description}>
          अपने ट्रैक्टर के काम और पैसे का हिसाब आसानी से रखें।
        </Text>
      </View>
      <View style={styles.actions}>
        <AppButton
          title="बोलकर काम जोड़ें"
          subtitle="अपनी भाषा में काम बताएं"
          icon="mic"
          onPress={onVoiceEntry}
        />
        <AppButton
          title="लिखकर काम जोड़ें"
          subtitle="खुद जानकारी भरें"
          icon="edit"
          variant="secondary"
          onPress={onManualEntry}
        />
      </View>
      <Text style={styles.sectionTitle}>काम का हिसाब</Text>
      <View style={styles.stats}>
        <StatCard title="आज के काम" value={`${stats.todayJobs} काम`} />

        <StatCard
          title="बाकी पैसा"
          value={formatRupees(stats.pendingPaise)}
          variant="warning"
        />
      </View>

      <Text style={styles.sectionTitle}>जल्दी खोलें</Text>

      <View style={styles.shortcuts}>
        <AppButton
          title="किसान"
          icon="edit"
          variant="secondary"
          onPress={onFarmers}
        />

        <AppButton
          title="किसान का हिसाब"
          variant="secondary"
          onPress={onLedger}
        />
      </View>

      <View style={styles.footer}>
        <Users size={17} color={colors.textSecondary} />
        <BookOpen size={17} color={colors.textSecondary} />
        <Text style={styles.footerText}>अभी सभी सुविधाएं मुफ्त हैं</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  brandText: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },
  description: {
    marginTop: spacing.sm,
    fontSize: 16,
    lineHeight: 26,
    color: colors.textSecondary,
  },
  actions: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
  },
  stats: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  shortcuts: {
    gap: spacing.sm,
  },
  footer: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  footerText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
