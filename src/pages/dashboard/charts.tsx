import { TotalIncomeWidget } from "@/components/charts/total-income-widget";
import { TotalOutcomeWidget } from "@/components/charts/total-outcome-widget";
import { RestDebtWidget } from "@/components/charts/rest-debt-widget";
import { MetricWidget } from "@/components/charts/metric-widget";
import { CurrentMonthBudget } from "@/components/charts/current-month-budget";

export const Charts = () => {
  return (
    <div className="w-full flex-col space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalIncomeWidget />

        <TotalOutcomeWidget />

        <RestDebtWidget />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <MetricWidget />
        </div>

        <div className="col-span-1">
          <CurrentMonthBudget />
        </div>
      </div>
    </div>
  );
};
