import { Button } from "@/components/ui/button";
import { UserForm } from "@/components/user/user-form";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

function AddUser() {
    const navigate = useNavigate();

    const navigateToUsers = () => {
        navigate("/");
    };

    return (
        <main className="px-20 py-40 flex justify-center items-center">
            <div className="flex space-y-3 flex-col justify-start">
                <Button onClick={navigateToUsers} variant="outline" style={{ width: "fit-content" }}>
                    <ChevronLeftIcon className="h-4 w-4" />
                    Go back
                </Button>

                <UserForm />
            </div>
        </main>
    );
}

export default AddUser;
