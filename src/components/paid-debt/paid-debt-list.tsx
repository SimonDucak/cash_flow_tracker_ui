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
import { PaidDebtAdapter } from "@/adapters/PaidDebtAdapter";
import { PaidDebt } from "@/types/PaidDebt";

export const PaidDebtList = () => {
  const dashboardCtx = useDashboardContext();

  const totalAmount = dashboardCtx.state.paidDebts.reduce(
    (total, goal) => total + goal.amount,
    0
  );

  const deletePaidDebtTask = useTask(async (paidDebt: PaidDebt) => {
    try {
      const adatper = new PaidDebtAdapter(paidDebt.debtor);
      await adatper.deleteRecord(paidDebt.id);
      const paidDebts = dashboardCtx.state.paidDebts.filter(
        (debt) => debt.id !== paidDebt.id
      );
      dashboardCtx.setState((prev) => ({ ...prev, paidDebts: paidDebts }));
    } catch (err) {
      console.error(err);
    }
  });

  const findDebtor = (paidDebt: PaidDebt) =>
    dashboardCtx.state.debtors.find((debtor) => debtor.id === paidDebt.debtor);

  return (
    <div
      className="w-full border rounded-xl overflow-hidden"
      style={{ height: "fit-content" }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>

            <TableHead className="text-right">Date</TableHead>

            <TableHead className="text-right">Amount</TableHead>

            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dashboardCtx.state.paidDebts.map((paidDebt) => (
            <TableRow key={paidDebt.id}>
              <TableCell className="font-medium">
                {findDebtor(paidDebt)?.name || "Unknown debtor"}
              </TableCell>

              <TableCell className="text-right">
                {formatDate(paidDebt.createdAt)}
              </TableCell>

              <TableCell className="text-right">
                {formatCurrency(paidDebt.amount)}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  disabled={deletePaidDebtTask.isRunning}
                  onClick={() => deletePaidDebtTask.perform(paidDebt)}
                  size="sm"
                >
                  {deletePaidDebtTask.isRunning && (
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
            <TableCell colSpan={3}>Total</TableCell>

            <TableCell className="text-right">
              {formatCurrency(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
