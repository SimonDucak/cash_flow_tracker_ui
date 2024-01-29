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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useTask } from "@/hooks/task";
import { ExpectedIncomeAdapter } from "@/adapters/ExpectedIncomeAdapter";
import { useDashboardContext } from "@/hooks/dashboard-context";

const profileFormSchema = z.object({
  title: z
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
  dateFrom: z.date(),
  dateTo: z.date(),
});

type ExpectedIncomeValues = z.infer<typeof profileFormSchema>;

export function ExpectedIncomeForm() {
  const dashboardCtx = useDashboardContext();

  const firstDayInYear = new Date(new Date().getFullYear(), 0, 1);

  const lastDayInYear = new Date(new Date().getFullYear(), 11, 31);

  const defaultValues: Partial<ExpectedIncomeValues> = {
    title: "",
    amount: 0,
    dateFrom: firstDayInYear,
    dateTo: lastDayInYear,
  };

  const form = useForm<ExpectedIncomeValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const expectedIncomeTask = useTask(async (data: ExpectedIncomeValues) => {
    try {
      const adapter = new ExpectedIncomeAdapter(dashboardCtx.state.user.id);

      const expectedIncome = adapter.getEmptyRecord();

      const savedIncome = await adapter.createRecord({
        ...expectedIncome,
        ...data,
      });

      dashboardCtx.addExpectedIncome(savedIncome);

      form.reset();

      console.log(savedIncome);
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add expected income</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(expectedIncomeTask.perform)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
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

            <FormField
              control={form.control}
              name="dateFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date From</FormLabel>

                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date To</FormLabel>

                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={expectedIncomeTask.isRunning}>
              {expectedIncomeTask.isRunning && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add expected income
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
