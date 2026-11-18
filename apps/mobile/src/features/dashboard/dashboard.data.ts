export type WorkRecord = {
  id: string;
  farmerName: string;
  workType: string;
  amountPaise: number;
  receivedPaise: number;
  date: string;
};

export const sampleRecords: WorkRecord[] = [
  {
    id: "work-001",
    farmerName: "रामलाल यादव",
    workType: "जुताई",
    amountPaise: 240000,
    receivedPaise: 100000,
    date: "2026-11-17",
  },
  {
    id: "work-002",
    farmerName: "मोहन यादव",
    workType: "9 हरवा",
    amountPaise: 450000,
    receivedPaise: 0,
    date: "2026-11-17",
  },
  {
    id: "work-003",
    farmerName: "सुरेश सिंह",
    workType: "ढुलाई",
    amountPaise: 250000,
    receivedPaise: 250000,
    date: "2026-11-17",
  },
];

export function calculateDashboard(records: WorkRecord[], today: string) {
  const todaysRecords = records.filter((record) => record.date === today);

  const pendingPaise = records.reduce(
    (total, record) =>
      total + Math.max(0, record.amountPaise - record.receivedPaise),
    0,
  );

  return {
    todayJobs: todaysRecords.length,
    pendingPaise,
    totalJobs: records.length,
  };
}

export function formatRupees(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })}`;
}
