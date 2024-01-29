import { useTheme } from "next-themes";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { themes } from "@/registry/themes";
import { useDashboardContext } from "@/hooks/dashboard-context";

export type MetricObject = {
  actualAmmountPrediction: number;
  bestCasePrediction: number;
};

export function MetricWidget() {
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === "red");

  const { state } = useDashboardContext();

  const monthsIndexes = Array.from({ length: 12 }, (_, index) => index);

  const totalDebtOfDebtors = state.debtors.reduce(
    (accumulator, debtor) => accumulator + debtor.amount,
    0
  );

  const data: MetricObject[] = monthsIndexes.map((monthIndex) => {
    const lastDateOfMonth = new Date(new Date().getFullYear(), monthIndex, 29);

    const savingGoals = state.savingGoals.filter(
      (income) =>
        income.dateFrom <= lastDateOfMonth && income.dateTo >= lastDateOfMonth
    );

    const debtPaids = state.paidDebts.filter(
      (debt) => debt.createdAt <= lastDateOfMonth
    );

    const totalDebtPaidToThisMonth = debtPaids.reduce(
      (accumulator, debt) => accumulator + debt.amount,
      0
    );

    const multiplier = monthIndex + 1;

    const savingGoalsPrediction = savingGoals.reduce(
      (accumulator, income) => accumulator + income.amount * multiplier,
      0
    );

    return {
      actualAmmountPrediction:
        savingGoalsPrediction +
        state.user.savingFromJanuary2024 +
        totalDebtPaidToThisMonth,
      bestCasePrediction:
        savingGoalsPrediction +
        state.user.savingFromJanuary2024 +
        totalDebtOfDebtors,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Metrics</CardTitle>

        <CardDescription>
          Predictions for my{" "}
          <span className="font-semibold">{new Date().getFullYear()}</span> cash
          flow.
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Actual ammount prediction
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[1].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Best case prediction
                            </span>
                            <span className="font-bold">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="bestCasePrediction"
                activeDot={{
                  r: 6,
                  style: { fill: "var(--theme-primary)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    opacity: 0.25,
                    "--theme-primary": `hsl(${
                      theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                  } as React.CSSProperties
                }
              />

              <Line
                type="monotone"
                dataKey="actualAmmountPrediction"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--theme-primary)" },
                }}
                style={
                  {
                    stroke: "var(--theme-primary)",
                    "--theme-primary": `hsl(${
                      theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                    })`,
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
