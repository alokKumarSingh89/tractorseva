import React, { useState } from "react";

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
        onBack={() => setScreen("farmers")}
      />
    );
  }

  if (screen === "farmers") {
    return (
      <FarmerListScreen
        onAdd={() => openFarmerForm()}
        onEdit={openFarmerForm}
      />
    );
  }

  if (screen === "voice" || screen === "manual" || screen === "ledger") {
    return (
      <PlaceholderScreen
        title={titles[screen]}
        onBack={() => setScreen("home")}
      />
    );
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
