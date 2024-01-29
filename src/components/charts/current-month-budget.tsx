import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { formatCurrency } from "@/utils/formatters";
import { IoRocketOutline } from "react-icons/io5";

export const CurrentMonthBudget = () => {
  const now = new Date();

  const { state } = useDashboardContext();

  const incomes = state.expectedIncomes.filter(
    (income) => income.dateFrom <= now && income.dateTo >= now
  );

  const outcomes = state.expectedOutcomes.filter(
    (outcome) => outcome.dateFrom <= now && outcome.dateTo >= now
  );

  const savingGoals = state.savingGoals.filter(
    (income) => income.dateFrom <= now && income.dateTo >= now
  );

  const totalExpectedIncome = incomes.reduce(
    (accumulator, income) => accumulator + income.amount,
    0
  );

  const totalExpectedOutcome = outcomes.reduce(
    (accumulator, outcome) => accumulator + outcome.amount,
    0
  );

  const totalSavingGoals = savingGoals.reduce(
    (accumulator, income) => accumulator + income.amount,
    0
  );

  const totalExpectedBudget =
    totalExpectedIncome - totalExpectedOutcome - totalSavingGoals;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Month Budget</CardTitle>

        <IoRocketOutline className="w-4 h-4" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">
          {formatCurrency(totalExpectedBudget)}
        </div>
        <p className="text-xs text-muted-foreground">
          My disposable budget to enjoy this month
        </p>
      </CardContent>
    </Card>
  );
};
