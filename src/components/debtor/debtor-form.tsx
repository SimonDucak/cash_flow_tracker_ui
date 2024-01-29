import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTask } from "@/hooks/task";
import { DebtorAdapter } from "@/adapters/DebtorAdapter";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { ReloadIcon } from "@radix-ui/react-icons";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  amount: z.number().min(1, {
    message: "Amount must be at least 1.",
  }),
});

type DebtorValues = z.infer<typeof profileFormSchema>;

export function DebtorForm() {
  const dashboardCtx = useDashboardContext();

  const defaultValues: Partial<DebtorValues> = {
    name: "",
    amount: 0,
  };

  const form = useForm<DebtorValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const debtorTask = useTask(async (data: DebtorValues) => {
    try {
      const adapter = new DebtorAdapter(dashboardCtx.state.user.id);

      const debtor = adapter.getEmptyRecord();

      const savedDebtor = await adapter.createRecord({
        ...debtor,
        ...data,
      });

      dashboardCtx.addDebtor(savedDebtor);

      form.reset();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add debtor</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(debtorTask.perform)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input placeholder="Enter your name..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
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

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={debtorTask.isRunning}>
              {debtorTask.isRunning && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add debtor
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
