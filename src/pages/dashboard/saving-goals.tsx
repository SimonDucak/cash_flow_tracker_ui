import { SavingGoalForm } from "@/components/saving-goal/saving-goal-form";
import { Separator } from "@/components/ui/separator";

const SavingGoals = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Saving goals</h3>
        <p className="text-sm text-muted-foreground">
          Create saving goals to track your progress, and to help you stay on
          track.
        </p>
      </div>

      <Separator />

      <div className="w-full flex">
        <div className="w-full f-wrap flex gap-4"></div>

        <div className="w-[320px] shrink-0">
          <SavingGoalForm />
        </div>
      </div>
    </div>
  );
};

export default SavingGoals;
