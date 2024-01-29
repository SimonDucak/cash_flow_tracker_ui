import { UserAdapter } from "@/adapters/UserAdapter";
import { Button } from "@/components/ui/button";
import { useNavigator } from "@/hooks/navigator";
import { parseNumber } from "@/utils/parsers";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { useTask } from "@/hooks/task";
import { ReloadIcon } from "@radix-ui/react-icons";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  savingFromJanuary2024: z.number(),
});

type SettingFormValues = z.infer<typeof profileFormSchema>;

const Settings = () => {
  const dashboardCtx = useDashboardContext();

  const defaultValues: Partial<SettingFormValues> = {
    name: dashboardCtx.state.user.name,
    savingFromJanuary2024: dashboardCtx.state.user.savingFromJanuary2024,
  };

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { id } = useParams<{ id: string }>();

  const { navigateToUsers } = useNavigator();

  const adapter = new UserAdapter();

  const deleteAccountTask = useTask(async (): Promise<void> => {
    try {
      const userId = parseNumber(id);
      await adapter.deleteRecord(userId);
      navigateToUsers();
    } catch (err) {
      console.log(err);
    }
  });

  const updateProfileTask = useTask(async (data: SettingFormValues) => {
    try {
      const updatedUser = {
        ...dashboardCtx.state.user,
        name: data.name,
        savingFromJanuary2024: data.savingFromJanuary2024,
      };
      await adapter.updateRecord(updatedUser);
      dashboardCtx.setState((prev) => ({ ...prev, user: updatedUser }));
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Delete your account and all of your data. This action cannot be
          undone.
        </p>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateProfileTask.perform)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>

                <FormControl>
                  <Input placeholder="Enter your name..." {...field} />
                </FormControl>

                <FormDescription>
                  This is your public display name. It can be your real name or
                  a pseudonym. You can only change this once every 30 days.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="savingFromJanuary2024"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter amount..."
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>

                <FormDescription>
                  My savings to January 2024. It used to calculate my actual
                  net.
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={updateProfileTask.isRunning} type="submit">
            {updateProfileTask.isRunning && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update profile
          </Button>
        </form>
      </Form>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Danger Zone</h3>

        <p className="text-sm mb-3 text-muted-foreground">
          Delete your account and all of your data. This action cannot be
          undone.
        </p>

        <Button
          disabled={deleteAccountTask.isRunning}
          variant="outline"
          onClick={deleteAccountTask.perform}
        >
          {deleteAccountTask.isRunning && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Settings;
