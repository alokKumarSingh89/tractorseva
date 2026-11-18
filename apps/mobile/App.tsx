import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  NotoSansDevanagari_400Regular,
  NotoSansDevanagari_500Medium,
  NotoSansDevanagari_600SemiBold,
  NotoSansDevanagari_700Bold,
} from "@expo-google-fonts/noto-sans-devanagari";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { initializeDatabase } from "./src/database/sqlite";
import { colors } from "./src/theme/colors";
import { fonts } from "./src/theme/fonts";

export default function App() {
  const [databaseReady, setDatabaseReady] = useState(false);
  const [databaseError, setDatabaseError] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_500Medium,
    NotoSansDevanagari_600SemiBold,
    NotoSansDevanagari_700Bold,
  });

  useEffect(() => {
    let mounted = true;

    initializeDatabase()
      .then(() => {
        if (mounted) setDatabaseReady(true);
      })
      .catch((error) => {
        console.error("Database initialization failed:", error);
        if (mounted) setDatabaseError(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const ready = databaseReady && (fontsLoaded || Boolean(fontError));

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["top", "bottom", "left", "right"]}
      >
        <StatusBar style="dark" />

        {databaseError ? (
          <View style={styles.center}>
            <Text style={styles.message}>
              डेटा खोलने में समस्या हुई। ऐप दोबारा खोलें।
            </Text>
          </View>
        ) : !ready ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.message}>TractorSeva खुल रहा है...</Text>
          </View>
        ) : (
          <AppNavigator />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 28,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 16,
  },
});
