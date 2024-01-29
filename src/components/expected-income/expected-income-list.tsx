import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { useTask } from "@/hooks/task";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ExpectedIncomeAdapter } from "@/adapters/ExpectedIncomeAdapter";

export const ExpectedIncomeList = () => {
  const dashboardCtx = useDashboardContext();

  const totalAmount = dashboardCtx.state.expectedIncomes.reduce(
    (total, goal) => total + goal.amount,
    0
  );

  const deleteIncomeTask = useTask(async (incomeId: number) => {
    try {
      const adatper = new ExpectedIncomeAdapter(dashboardCtx.state.user.id);
      await adatper.deleteRecord(incomeId);
      const incomes = dashboardCtx.state.expectedIncomes.filter(
        (income) => income.id !== incomeId
      );
      dashboardCtx.setState((prev) => ({ ...prev, expectedIncomes: incomes }));
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <div
      className="w-full border rounded-xl overflow-hidden"
      style={{ height: "fit-content" }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>

            <TableHead>Date from</TableHead>

            <TableHead>Date to</TableHead>

            <TableHead className="text-right">Amount</TableHead>

            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dashboardCtx.state.expectedIncomes.map((income) => (
            <TableRow key={income.id}>
              <TableCell className="font-medium">{income.title}</TableCell>

              <TableCell>{formatDate(income.dateFrom)}</TableCell>

              <TableCell>{formatDate(income.dateTo)}</TableCell>

              <TableCell className="text-right">
                {formatCurrency(income.amount)}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  disabled={deleteIncomeTask.isRunning}
                  onClick={() => deleteIncomeTask.perform(income.id)}
                  size="sm"
                >
                  {deleteIncomeTask.isRunning && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>

            <TableCell className="text-right">
              {formatCurrency(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
