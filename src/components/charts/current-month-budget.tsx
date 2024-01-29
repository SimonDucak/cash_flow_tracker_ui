import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";
import { IoRocketOutline } from "react-icons/io5";

export const CurrentMonthBudget = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Month Budget</CardTitle>

        <IoRocketOutline className="w-4 h-4" />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(501)}</div>
        <p className="text-xs text-muted-foreground">
          My disposable budget to enjoy this month
        </p>
      </CardContent>
    </Card>
  );
};
