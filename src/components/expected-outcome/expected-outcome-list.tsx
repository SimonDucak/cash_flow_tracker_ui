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
import { ExpectedOutcomeAdapter } from "@/adapters/ExpectedOutcomeAdapter";

export const ExpectedOutcomeList = () => {
  const dashboardCtx = useDashboardContext();

  const totalAmount = dashboardCtx.state.expectedOutcomes.reduce(
    (total, goal) => total + goal.amount,
    0
  );

  const deleteOutcomeTask = useTask(async (outcomeId: number) => {
    try {
      const adatper = new ExpectedOutcomeAdapter(dashboardCtx.state.user.id);
      await adatper.deleteRecord(outcomeId);
      const outcomes = dashboardCtx.state.expectedOutcomes.filter(
        (outcome) => outcome.id !== outcomeId
      );
      dashboardCtx.setState((prev) => ({
        ...prev,
        expectedOutcomes: outcomes,
      }));
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
          {dashboardCtx.state.expectedOutcomes.map((outcome) => (
            <TableRow key={outcome.id}>
              <TableCell className="font-medium">{outcome.title}</TableCell>

              <TableCell>{formatDate(outcome.dateFrom)}</TableCell>

              <TableCell>{formatDate(outcome.dateTo)}</TableCell>

              <TableCell className="text-right">
                {formatCurrency(outcome.amount)}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  disabled={deleteOutcomeTask.isRunning}
                  onClick={() => deleteOutcomeTask.perform(outcome.id)}
                  size="sm"
                >
                  {deleteOutcomeTask.isRunning && (
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
