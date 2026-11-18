import React, { useEffect, useState } from "react";
import { BackHandler, Platform } from "react-native";

import { DashboardScreen } from "../features/dashboard/DashboardScreen";
import { FarmerFormScreen } from "../features/farmers/FarmerFormScreen";
import { FarmerListScreen } from "../features/farmers/FarmerListScreen";
import { Farmer } from "../features/farmers/farmer.repository";
import { PlaceholderScreen } from "../screens/PlaceholderScreen";

type Screen =
  | "home"
  | "voice"
  | "manual"
  | "farmers"
  | "farmer-form"
  | "ledger";

const titles = {
  voice: "बोलकर काम जोड़ें",
  manual: "लिखकर काम जोड़ें",
  ledger: "किसान का हिसाब",
};

export function AppNavigator() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | undefined>();

  function goBack() {
    if (screen === "farmer-form") {
      setSelectedFarmer(undefined);
      setScreen("farmers");
    } else if (screen !== "home") {
      setScreen("home");
    }
  }

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (screen === "home") return false;
        goBack();
        return true;
      },
    );

    return () => subscription.remove();
  }, [screen]);

  function openFarmerForm(farmer?: Farmer) {
    setSelectedFarmer(farmer);
    setScreen("farmer-form");
  }

  if (screen === "farmer-form") {
    return (
      <FarmerFormScreen
        farmer={selectedFarmer}
        onSaved={() => {
          setSelectedFarmer(undefined);
          setScreen("farmers");
        }}
        onBack={goBack}
      />
    );
  }

  if (screen === "farmers") {
    return (
      <FarmerListScreen
        onAdd={() => openFarmerForm()}
        onEdit={openFarmerForm}
        onHome={() => setScreen("home")}
      />
    );
  }

  if (screen === "voice" || screen === "manual" || screen === "ledger") {
    return <PlaceholderScreen title={titles[screen]} onBack={goBack} />;
  }

  return (
    <DashboardScreen
      onVoiceEntry={() => setScreen("voice")}
      onManualEntry={() => setScreen("manual")}
      onFarmers={() => setScreen("farmers")}
      onLedger={() => setScreen("ledger")}
    />
  );
}
