import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function LanguagePie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: "C++" },
            { id: 1, value: 15, label: "Javascript" },
            { id: 2, value: 20, label: "Python" },
            { id: 3, value: 25, label: "Others" },
          ],
        },
      ]}
      height={500}
    />
  );
}
