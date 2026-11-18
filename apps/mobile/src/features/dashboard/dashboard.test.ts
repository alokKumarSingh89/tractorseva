import { describe, expect, it } from "vitest";

import {
  calculateDashboard,
  formatRupees,
  type WorkRecord,
} from "./dashboard.data";

describe("Dashboard calculations", () => {
  const records: WorkRecord[] = [
    {
      id: "1",
      farmerName: "रामलाल",
      workType: "जुताई",
      date: "2026-11-17",
      amountPaise: 500000,
      receivedPaise: 200000,
    },
    {
      id: "2",
      farmerName: "मोहन",
      workType: "9 हरवा",
      date: "2026-11-16",
      amountPaise: 200000,
      receivedPaise: 200000,
    },
  ];

  it("counts only today's work", () => {
    const result = calculateDashboard(records, "2026-11-17");

    expect(result.todayJobs).toBe(1);
  });

  it("calculates outstanding payments", () => {
    const result = calculateDashboard(records, "2026-11-17");

    expect(result.pendingPaise).toBe(300000);
  });

  it("does not count overpayment as negative due", () => {
    const result = calculateDashboard(
      [
        {
          ...records[0],
          receivedPaise: 600000,
        },
      ],
      "2026-11-17",
    );

    expect(result.pendingPaise).toBe(0);
  });

  it("formats paise as rupees", () => {
    expect(formatRupees(250000)).toBe("₹2,500");
  });

  it("handles an empty dashboard", () => {
    const result = calculateDashboard([], "2026-11-17");

    expect(result.totalJobs).toBe(0);
    expect(result.pendingPaise).toBe(0);
  });
});
