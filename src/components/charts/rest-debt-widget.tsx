import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { formatCurrency } from "@/utils/formatters";
import { IoWalletOutline } from "react-icons/io5";

export const RestDebtWidget = () => {
  const ctx = useDashboardContext();

  const totalDebt = ctx.state.debtors.reduce(
    (total, debtor) => total + debtor.amount,
    0
  );

  const totalDebtPaid = ctx.state.paidDebts.reduce(
    (total, debt) => total + debt.amount,
    0
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Waiting for payment
        </CardTitle>

        <IoWalletOutline className="w-4 h-4" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">
          {formatCurrency(totalDebt - totalDebtPaid)}
        </div>
        <p className="text-xs text-muted-foreground">
          Debt from debtors that are not paid yet until today.
        </p>
      </CardContent>
    </Card>
  );
};
