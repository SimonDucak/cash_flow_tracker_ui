import { ExpectedOutcomeForm } from "@/components/expected-outcome/expected-outcome-form";
import { ExpectedOutcomeList } from "@/components/expected-outcome/expected-outcome-list";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { IoWalletOutline } from "react-icons/io5";

const ExpectedOutcomes = () => {
  const dashboardCtx = useDashboardContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Expected outcomes</h3>

        <p className="text-sm text-muted-foreground">
          Create expected net outcomes to track your progress, and to help you
          stay on track.
        </p>
      </div>

      <div className="w-full flex space-x-4">
        <div className="w-full f-wrap flex gap-4">
          {dashboardCtx.state.expectedOutcomes.length === 0 && (
            <div className="w-full rounded-lg border flex flex-col items-center justify-center">
              <IoWalletOutline className="w-10 h-10 mb-4 text-muted" />

              <div className="text-center">
                <p className="text-lg font-medium">No expected outcomes yet</p>

                <p className="text-sm text-muted-foreground">
                  Create your first expected outcome to start tracking.
                </p>
              </div>
            </div>
          )}

          {dashboardCtx.state.expectedOutcomes.length > 0 &&
            ExpectedOutcomeList()}
        </div>

        <div className="w-[320px] shrink-0">
          <ExpectedOutcomeForm />
        </div>
      </div>
    </div>
  );
};

export default ExpectedOutcomes;
