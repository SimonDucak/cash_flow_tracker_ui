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
import { SavingGoalAdapter } from "@/adapters/SavingGoalAdapter";
import { ReloadIcon } from "@radix-ui/react-icons";

export const SavingGoalsList = () => {
  const dashboardCtx = useDashboardContext();

  const totalAmount = dashboardCtx.state.savingGoals.reduce(
    (total, goal) => total + goal.amount,
    0
  );

  const deleteGoalTask = useTask(async (goalId: number) => {
    try {
      const adatper = new SavingGoalAdapter(dashboardCtx.state.user.id);
      await adatper.deleteRecord(goalId);
      const goals = dashboardCtx.state.savingGoals.filter(
        (goal) => goal.id !== goalId
      );
      dashboardCtx.setState((prev) => ({ ...prev, savingGoals: goals }));
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
            <TableHead className="w-[200px]">Name</TableHead>

            <TableHead>Date from</TableHead>

            <TableHead>Date to</TableHead>

            <TableHead className="text-right">Amount</TableHead>

            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dashboardCtx.state.savingGoals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell className="font-medium">{goal.name}</TableCell>

              <TableCell>{formatDate(goal.dateFrom)}</TableCell>

              <TableCell>{formatDate(goal.dateTo)}</TableCell>

              <TableCell className="text-right">
                {formatCurrency(goal.amount)}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  disabled={deleteGoalTask.isRunning}
                  onClick={() => deleteGoalTask.perform(goal.id)}
                  size="sm"
                >
                  {deleteGoalTask.isRunning && (
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
