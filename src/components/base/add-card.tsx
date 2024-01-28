import {
    Card,
    CardContent,
    CardDescription
} from "@/components/ui/card";
import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

interface AddCardProps {
    onClick: () => void;
}

const AddCard: React.FC<AddCardProps> = ({ onClick }) => {
    return (
        <Card 
            className="
                w-[350px] py-12 cursor-pointer text-muted-foreground
                hover:bg-muted transition-all duration-200 hover:text-foreground
            "
            onClick={onClick}
        >            
            <CardContent className="w-full h-full flex justify-center items-center flex-col">
                <IoAddCircleOutline className="w-20 h-20 mb-3" />
                
                <CardDescription className="text-center">
                    <strong>Add new user</strong>
                </CardDescription>
            </CardContent>
        </Card>
    );
};


export default AddCard;