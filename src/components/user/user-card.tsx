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
import { formatCurrency } from "@/utils/formatters";

export interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    return (
        <Card className="w-[350px] py-12">
            <CardHeader className="flex justify-center items-center mb-2">
                <IoPersonCircleOutline className="w-20 h-20 text-muted" />
            </CardHeader>
            
            <CardContent className="flex justify-center items-center flex-col">
                <CardTitle className="mb-2">{user.name}</CardTitle>

                <CardDescription className="text-center">
                    {formatCurrency(user.expectedSAvingsPerMonth * 12)} / year
                </CardDescription>
            </CardContent>
            
            <CardFooter className="flex justify-center">
                <Button>Open account</Button> 
            </CardFooter>
        </Card>
    )
}

export default UserCard