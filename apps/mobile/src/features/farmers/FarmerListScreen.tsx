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
  Plus,
  Search,
  UserRound,
  ChevronRight,
  House,
} from "lucide-react-native";

import { colors } from "../../theme/colors";
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
      setFarmers(await listFarmers(search));
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
          style={styles.homeButton}
        >
          <House size={24} color={colors.primary} />
          <Text style={styles.homeText}>होम</Text>
        </Pressable>

        <Text style={styles.title}>मेरे किसान</Text>
      </View>

      <View style={styles.searchBox}>
        <Search size={22} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="नाम, मोबाइल या गाँव खोजें"
          placeholderTextColor={colors.textSecondary}
          accessibilityLabel="किसान खोजें"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={farmers}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={styles.empty}>
              कोई किसान नहीं मिला। नया किसान जोड़ें।
            </Text>
          }
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${item.name} की जानकारी बदलें`}
              onPress={() => onEdit(item)}
              style={styles.card}
            >
              <View style={styles.avatar}>
                <UserRound size={25} color={colors.primary} />
              </View>

              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.village}>{item.village}</Text>
                {item.mobile ? (
                  <Text style={styles.mobile}>{item.mobile}</Text>
                ) : null}
              </View>

              <ChevronRight size={22} color={colors.textSecondary} />
            </Pressable>
          )}
        />
      )}

      <Pressable
        style={styles.addButton}
        accessibilityRole="button"
        onPress={onAdd}
      >
        <Plus size={25} color={colors.white} />
        <Text style={styles.addText}>नया किसान जोड़ें</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  homeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 52,
    alignSelf: "flex-start",
  },
  homeText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primary,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 86,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  village: {
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 3,
  },
  mobile: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
  },
  empty: {
    textAlign: "center",
    marginTop: spacing.xxl,
    color: colors.textSecondary,
    fontSize: 16,
  },
  addButton: {
    minHeight: 60,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  addText: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "700",
  },
});
