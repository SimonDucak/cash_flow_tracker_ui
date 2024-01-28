import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoPersonCircleOutline } from "react-icons/io5";
import { User } from "@/types/User";
import { useNavigator } from "@/hooks/navigator";

export interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { navigateToDashboard } = useNavigator();

  return (
    <Card
      onClick={() => navigateToDashboard(user.id.toString())}
      className="w-[350px] py-12 hover:bg-muted transition-all duration-200 hover:text-foreground cursor-pointer"
    >
      <CardHeader className="flex justify-center items-center mb-2">
        <IoPersonCircleOutline className="w-20 h-20" />
      </CardHeader>

      <CardContent className="flex justify-center items-center flex-col">
        <CardTitle className="mb-2">{user.name}</CardTitle>

        <CardDescription className="text-center">
          Goal for year 2024: <span className="font-semibold">Unknown</span>
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button onClick={() => navigateToDashboard(user.id.toString())}>
          Open account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
