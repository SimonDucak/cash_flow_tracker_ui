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
import { formatCurrency } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { useTask } from "@/hooks/task";
import { ReloadIcon } from "@radix-ui/react-icons";
import { DebtorAdapter } from "@/adapters/DebtorAdapter";

export const DebtorList = () => {
  const dashboardCtx = useDashboardContext();

  const totalAmount = dashboardCtx.state.debtors.reduce(
    (total, goal) => total + goal.amount,
    0
  );

  const deleteDebtorTask = useTask(async (debtorId: number) => {
    try {
      const adatper = new DebtorAdapter(dashboardCtx.state.user.id);
      await adatper.deleteRecord(debtorId);
      const debtors = dashboardCtx.state.debtors.filter(
        (debtor) => debtor.id !== debtorId
      );
      dashboardCtx.setState((prev) => ({ ...prev, debtors: debtors }));
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

            <TableHead className="text-right">Amount</TableHead>

            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dashboardCtx.state.debtors.map((debtor) => (
            <TableRow key={debtor.id}>
              <TableCell className="font-medium">{debtor.name}</TableCell>

              <TableCell className="text-right">
                {formatCurrency(debtor.amount)}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  disabled={deleteDebtorTask.isRunning}
                  onClick={() => deleteDebtorTask.perform(debtor.id)}
                  size="sm"
                >
                  {deleteDebtorTask.isRunning && (
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
            <TableCell colSpan={2}>Total</TableCell>

            <TableCell className="text-right">
              {formatCurrency(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
