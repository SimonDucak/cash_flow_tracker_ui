import { UserAdapter } from "@/adapters/UserAdapter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigator } from "@/hooks/navigator";
import { useState } from "react";

export function UserForm() {
  const { navigateToDashboard } = useNavigator();

  const [name, setName] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsButtonDisabled(event.target.value === "");
  };

  const createUser = async (): Promise<void> => {
    try {
      if (!name) return;

      const adapter = new UserAdapter();

      const record = adapter.getEmptyRecord();

      record.name = name;

      const newUser = await adapter.createRecord(record);

      navigateToDashboard(newUser.id.toString());
    } catch (err) {
      console.log(err);
      // TODO: Handle error
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create user</CardTitle>

        <CardDescription>Deploy your new account in one-click.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createUser();
          }}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                placeholder="Enter your name..."
                value={name}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={createUser} disabled={isButtonDisabled}>
          Create user
        </Button>
      </CardFooter>
    </Card>
  );
}
