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
import { PaidDebtAdapter } from "@/adapters/PaidDebtAdapter";
import { useDashboardContext } from "@/hooks/dashboard-context";
import { CalendarIcon, CaretSortIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

const profileFormSchema = z.object({
  debtor: z.number().min(1, {
    message: "Please select debtor from the list.",
  }),
  createdAt: z.date().refine((date) => date !== null, {
    message: "Please select date.",
  }),
  amount: z.number().min(1, {
    message: "Amount must be at least 1.",
  }),
});

type PaidDebtValues = z.infer<typeof profileFormSchema>;

export function PaidDebtForm() {
  const dashboardCtx = useDashboardContext();

  const defaultValues: Partial<PaidDebtValues> = {
    debtor: 0,
    amount: 0,
    createdAt: new Date(),
  };

  const form = useForm<PaidDebtValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const paidDebtTask = useTask(async (data: PaidDebtValues) => {
    try {
      const adapter = new PaidDebtAdapter(dashboardCtx.state.user.id);

      const paidDebt = adapter.getEmptyRecord();

      const savedPaidDebt = await adapter.createRecord({
        ...paidDebt,
        ...data,
      });

      dashboardCtx.addPaidDebt(savedPaidDebt);

      form.reset();
    } catch (err) {
      console.log(err);
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add debt record</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(paidDebtTask.perform)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="debtor"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Debtor</FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {field.value
                            ? dashboardCtx.state.debtors.find(
                                (debtor) => debtor.id === field.value
                              )?.name
                            : "Select debtor"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search debtor..." />

                        <CommandEmpty>No debtor found.</CommandEmpty>

                        <CommandGroup>
                          {dashboardCtx.state.debtors.map((debtor) => (
                            <CommandItem
                              value={debtor.name}
                              key={debtor.id}
                              onSelect={() => {
                                form.setValue("debtor", debtor.id);
                              }}
                            >
                              {debtor.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>

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

            <Button disabled={paidDebtTask.isRunning}>
              {paidDebtTask.isRunning && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add debt record
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
