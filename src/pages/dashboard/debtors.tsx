import { DebtorForm } from "@/components/debtor/debtor-form";
import { DebtorList } from "@/components/debtor/debtor-list";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { IoWalletOutline } from "react-icons/io5";

const Debtors = () => {
  const dashboardCtx = useDashboardContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Debtors</h3>

        <p className="text-sm text-muted-foreground">
          Create debtors to track their debt.
        </p>
      </div>

      <div className="w-full flex space-x-4">
        <div className="w-full f-wrap flex gap-4">
          {dashboardCtx.state.debtors.length === 0 && (
            <div className="w-full rounded-lg border flex flex-col items-center justify-center">
              <IoWalletOutline className="w-10 h-10 mb-4 text-muted" />

              <div className="text-center">
                <p className="text-lg font-medium">No debtors yet</p>

                <p className="text-sm text-muted-foreground">
                  Create your first debtor to start tracking.
                </p>
              </div>
            </div>
          )}

          {dashboardCtx.state.debtors.length > 0 && DebtorList()}
        </div>

        <div className="w-[320px] shrink-0">
          <DebtorForm />
        </div>
      </div>
    </div>
  );
};

export default Debtors;
