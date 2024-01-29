import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { DueType } from "@/types/DueType";
import { ExpectedIncome } from "@/types/ExpectedIncome";
import { formatCurrency } from "@/utils/formatters";
import { IoTrendingUp } from "react-icons/io5";

export const TotalIncomeWidget = () => {
  const ctx = useDashboardContext();

  const now = new Date();

  const getIncomeMultiplier = (income: ExpectedIncome): number => {
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

  const totalExpectedIncome: number = ctx.state.expectedIncomes.reduce(
    (accumulator, expectedIncome) => {
      const expectedIncomeActive =
        expectedIncome.dateFrom <= now && expectedIncome.dateTo >= now;

      if (expectedIncomeActive === false) return accumulator;

      const multiplier = getIncomeMultiplier(expectedIncome);

      return accumulator + expectedIncome.amount * multiplier;
    },
    0
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Expected Income</CardTitle>

        <IoTrendingUp className="w-4 h-4" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold text-green-400">
          {formatCurrency(totalExpectedIncome)}
        </div>
        <p className="text-xs text-muted-foreground">
          For year {now.getFullYear()}
        </p>
      </CardContent>
    </Card>
  );
};
