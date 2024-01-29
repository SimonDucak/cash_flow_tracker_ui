import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { DueType } from "@/types/DueType";
import { ExpectedOutcome } from "@/types/ExpectedOutcome";
import { formatCurrency } from "@/utils/formatters";
import { IoTrendingDown } from "react-icons/io5";

export const TotalOutcomeWidget = () => {
  const ctx = useDashboardContext();

  const now = new Date();

  const getOutcomeMultiplier = (income: ExpectedOutcome): number => {
    if (income.dueType !== DueType.MONTHLY) return 1;

    const monthFrom =
      income.dateFrom.getFullYear() < now.getFullYear()
        ? 0
        : income.dateFrom.getMonth();

    const monthTo =
      income.dateTo.getFullYear() > now.getFullYear()
        ? 12
        : income.dateTo.getMonth() + 1;

    return monthTo - monthFrom;
  };

  const totalExpectedOutcome: number = ctx.state.expectedOutcomes.reduce(
    (accumulator, expectedOutcome) => {
      const expectedOutcomeActive =
        expectedOutcome.dateFrom <= now && expectedOutcome.dateTo >= now;

      if (expectedOutcomeActive === false) return accumulator;

      const multiplier = getOutcomeMultiplier(expectedOutcome);

      return accumulator + expectedOutcome.amount * multiplier;
    },
    0
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Expected Outcome</CardTitle>

        <IoTrendingDown className="w-4 h-4" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-red-500">
          {formatCurrency(totalExpectedOutcome)}
        </div>
        <p className="text-xs text-muted-foreground">
          For year {now.getFullYear()}
        </p>
      </CardContent>
    </Card>
  );
};
