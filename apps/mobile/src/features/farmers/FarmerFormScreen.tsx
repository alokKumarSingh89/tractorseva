import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ArrowLeft, UserRound } from "lucide-react-native";

import { AppButton } from "../../components/AppButton";
import { FormField } from "../../components/FormField";
import { colors } from "../../theme/colors";
import { fonts } from "../../theme/fonts";
import { radius, spacing } from "../../theme/spacing";

import { Farmer, createFarmer, updateFarmer } from "./farmer.repository";
import { FarmerErrors, FarmerInput, validateFarmer } from "./farmer.validation";

type Props = {
  farmer?: Farmer;
  onSaved: () => void;
  onBack: () => void;
};

export function FarmerFormScreen({ farmer, onSaved, onBack }: Props) {
  const [form, setForm] = useState<FarmerInput>({
    name: farmer?.name ?? "",
    village: farmer?.village ?? "",
    mobile: farmer?.mobile ?? "",
    notes: farmer?.notes ?? "",
  });

  const [errors, setErrors] = useState<FarmerErrors>({});
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

      Alert.alert("जानकारी सेव हो गई", "किसान की जानकारी सुरक्षित हो गई है।", [
        { text: "ठीक है", onPress: onSaved },
      ]);
    } catch {
      Alert.alert("समस्या", "जानकारी सेव नहीं हुई। दोबारा कोशिश करें।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="वापस जाएं"
          onPress={onBack}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {farmer ? "किसान की जानकारी बदलें" : "नया किसान जोड़ें"}
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <UserRound size={28} color={colors.primary} />
          </View>

          <Text style={styles.introTitle}>किसान की जानकारी</Text>

          <Text style={styles.introDescription}>
            काम और भुगतान का हिसाब रखने के लिए किसान की जानकारी भरें।
          </Text>
        </View>

        <FormField
          label="किसान का नाम *"
          value={form.name}
          onChangeText={(value) => change("name", value)}
          placeholder="जैसे: रामलाल यादव"
          error={errors.name}
        />

        <FormField
          label="गाँव का नाम *"
          value={form.village}
          onChangeText={(value) => change("village", value)}
          placeholder="जैसे: सैदपुर"
          error={errors.village}
        />

        <FormField
          label="मोबाइल नंबर (वैकल्पिक)"
          value={form.mobile}
          onChangeText={(value) => change("mobile", value)}
          placeholder="10 अंकों का नंबर"
          keyboardType="phone-pad"
          error={errors.mobile}
        />

        <FormField
          label="अतिरिक्त जानकारी"
          value={form.notes}
          onChangeText={(value) => change("notes", value)}
          placeholder="पहचान या कोई जरूरी जानकारी"
          multiline
        />
      </ScrollView>

      <View style={styles.footer}>
        <AppButton
          title={saving ? "सेव हो रहा है..." : "किसान सेव करें"}
          icon="check"
          disabled={saving}
          onPress={save}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 20,
    lineHeight: 32,
    color: colors.text,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  intro: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.full,
    backgroundColor: colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  introTitle: {
    fontFamily: fonts.semibold,
    fontSize: 21,
    lineHeight: 34,
    color: colors.text,
    textAlign: "center",
  },
  introDescription: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
});
