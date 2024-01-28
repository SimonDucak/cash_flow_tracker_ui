import { SavingGoalForm } from "@/components/saving-goal/saving-goal-form";
import { SavingGoalsList } from "@/components/saving-goal/saving-goals-list";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { IoWalletOutline } from "react-icons/io5";

const SavingGoals = () => {
  const dashboardCtx = useDashboardContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Saving goals</h3>
        <p className="text-sm text-muted-foreground">
          Create saving goals to track your progress, and to help you stay on
          track.
        </p>
      </div>

      <div className="w-full flex space-x-4">
        <div className="w-full f-wrap flex gap-4">
          {dashboardCtx.state.savingGoals.length === 0 && (
            <div className="w-full rounded-lg border flex flex-col items-center justify-center">
              <IoWalletOutline className="w-10 h-10 mb-4 text-muted" />

              <div className="text-center">
                <p className="text-lg font-medium">No saving goals yet</p>

                <p className="text-sm text-muted-foreground">
                  Create your first saving goal to start saving.
                </p>
              </div>
            </div>
          )}

          {dashboardCtx.state.savingGoals.length > 0 && SavingGoalsList()}
        </div>

        <div className="w-[320px] shrink-0">
          <SavingGoalForm />
        </div>
      </div>
    </div>
  );
};

export default SavingGoals;
