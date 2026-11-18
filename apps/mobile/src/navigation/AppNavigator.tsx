import React, { useState } from "react";

import { DashboardScreen } from "../features/dashboard/DashboardScreen";
import { PlaceholderScreen } from "../screens/PlaceholderScreen";

type Screen = "home" | "voice" | "manual" | "farmers" | "ledger";

const titles: Record<Exclude<Screen, "home">, string> = {
  voice: "बोलकर काम जोड़ें",
  manual: "लिखकर काम जोड़ें",
  farmers: "किसान",
  ledger: "किसान का हिसाब",
};

export function AppNavigator() {
  const [screen, setScreen] = useState<Screen>("home");

  if (screen !== "home") {
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
