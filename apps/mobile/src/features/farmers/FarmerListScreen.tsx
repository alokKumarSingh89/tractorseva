import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ArrowLeft,
  ChevronRight,
  Plus,
  Search,
  UserRound,
  UsersRound,
} from "lucide-react-native";

import { colors } from "../../theme/colors";
import { fonts } from "../../theme/fonts";
import { radius, spacing } from "../../theme/spacing";
import { Farmer, listFarmers } from "./farmer.repository";

type Props = {
  onAdd: () => void;
  onEdit: (farmer: Farmer) => void;
  onHome: () => void;
};

export function FarmerListScreen({ onAdd, onEdit, onHome }: Props) {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const result = await listFarmers(search);
      setFarmers(result);
    } catch {
      Alert.alert("समस्या", "किसान की सूची नहीं खुल सकी");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          onPress={onHome}
          accessibilityRole="button"
          accessibilityLabel="होम पर जाएं"
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          मेरे किसान
        </Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryIcon}>
          <UsersRound size={25} color={colors.primary} />
        </View>

        <View>
          <Text style={styles.summaryLabel}>
            {search ? "खोज में मिले किसान" : "कुल किसान"}
          </Text>
          <Text style={styles.summaryValue}>{farmers.length}</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <Search size={21} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="नाम, मोबाइल या गाँव खोजें"
          placeholderTextColor={colors.textMuted}
          accessibilityLabel="किसान खोजें"
        />
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={farmers}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <UsersRound size={38} color={colors.textMuted} />
              <Text style={styles.emptyTitle}>कोई किसान नहीं मिला</Text>
              <Text style={styles.emptyDescription}>
                {search
                  ? "दूसरे नाम या गाँव से खोजें"
                  : "शुरू करने के लिए नया किसान जोड़ें"}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${item.name} की जानकारी देखें`}
              onPress={() => onEdit(item)}
              style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            >
              <View style={styles.avatar}>
                <UserRound size={22} color={colors.primary} />
              </View>

              <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>

                <Text style={styles.village}>{item.village}</Text>

                {item.mobile ? (
                  <Text style={styles.mobile}>{item.mobile}</Text>
                ) : null}
              </View>

              <ChevronRight size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        />
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="नया किसान जोड़ें"
        onPress={onAdd}
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
      >
        <Plus size={23} color={colors.onPrimary} />
        <Text style={styles.addText}>नया किसान जोड़ें</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 64,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: fonts.semibold,
    fontSize: 21,
    lineHeight: 32,
    color: colors.text,
  },
  summary: {
    backgroundColor: colors.primaryContainer,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  summaryIcon: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryLabel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 23,
    color: colors.onPrimaryContainer,
  },
  summaryValue: {
    fontFamily: fonts.bold,
    fontSize: 26,
    lineHeight: 38,
    color: colors.onPrimaryContainer,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
  },
  list: {
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 86,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    lineHeight: 26,
    color: colors.text,
  },
  village: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  mobile: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  empty: {
    alignItems: "center",
    paddingTop: spacing.xxxl,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: colors.text,
  },
  emptyDescription: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
  },
  addButton: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    gap: spacing.sm,
    marginVertical: spacing.lg,
  },
  addText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.onPrimary,
  },
  pressed: {
    opacity: 0.85,
  },
});
