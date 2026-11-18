import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { initializeDatabase } from "./src/database/sqlite";
import { colors } from "./src/theme/colors";

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    initializeDatabase()
      .then(() => {
        if (mounted) setReady(true);
      })
      .catch((reason) => {
        console.error("Database initialization failed", reason);
        if (mounted) setError(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        {error ? (
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
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  message: {
    marginTop: 16,
    color: colors.text,
    fontSize: 17,
    textAlign: "center",
  },
});
