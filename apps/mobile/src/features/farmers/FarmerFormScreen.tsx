import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppButton } from "../../components/AppButton";
import { FormField } from "../../components/FormField";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";

import { Farmer, createFarmer, updateFarmer } from "./farmer.repository";

import { FarmerInput, validateFarmer } from "./farmer.validation";

type Props = {
  farmer?: Farmer;
  onSaved: () => void;
  onBack: () => void;
};

export function FarmerFormScreen({ farmer, onSaved, onBack }: Props) {
  const [form, setForm] = useState<FarmerInput>({
    name: farmer?.name ?? "",
    mobile: farmer?.mobile ?? "",
    village: farmer?.village ?? "",
    notes: farmer?.notes ?? "",
  });

  const [errors, setErrors] = useState(
    validateFarmer({
      name: "ok",
      mobile: "",
      village: "ok",
      notes: "",
    }),
  );

  const [saving, setSaving] = useState(false);

  function change(field: keyof FarmerInput, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  async function save() {
    if (saving) return;

    const nextErrors = validateFarmer(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSaving(true);

    try {
      if (farmer) {
        await updateFarmer(farmer.id, form);
      } else {
        await createFarmer(form);
      }

      Alert.alert("सफल", "किसान की जानकारी सेव हो गई", [
        { text: "ठीक है", onPress: onSaved },
      ]);
    } catch {
      Alert.alert("समस्या", "जानकारी सेव नहीं हुई। दोबारा कोशिश करें।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.back} onPress={onBack} accessibilityRole="button">
        ← वापस
      </Text>

      <Text style={styles.title}>
        {farmer ? "किसान की जानकारी बदलें" : "नया किसान जोड़ें"}
      </Text>

      <FormField
        label="किसान का नाम *"
        value={form.name}
        onChangeText={(v) => change("name", v)}
        placeholder="जैसे: रामलाल यादव"
        error={errors.name}
      />

      <FormField
        label="गाँव का नाम *"
        value={form.village}
        onChangeText={(v) => change("village", v)}
        placeholder="जैसे: सैदपुर"
        error={errors.village}
      />

      <FormField
        label="मोबाइल नंबर"
        value={form.mobile}
        onChangeText={(v) => change("mobile", v)}
        placeholder="10 अंकों का नंबर"
        keyboardType="phone-pad"
        error={errors.mobile}
      />

      <FormField
        label="अतिरिक्त जानकारी"
        value={form.notes}
        onChangeText={(v) => change("notes", v)}
        placeholder="कोई जरूरी जानकारी"
        multiline
      />

      <View style={styles.action}>
        <AppButton
          title={saving ? "सेव हो रहा है..." : "किसान सेव करें"}
          onPress={save}
        />
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
  back: {
    fontSize: 17,
    color: colors.primary,
    marginBottom: spacing.xl,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.xl,
  },
  action: {
    marginTop: spacing.md,
  },
});
