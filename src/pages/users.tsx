import AddCard from "@/components/base/add-card"
import UserCard from "@/components/user/user-card"
import { useEffect, useState } from 'react';
import { UserAdapter } from "@/adapters/UserAdapter";
import { User } from "@/types/User";
import { NavigatorRoute, useNavigator } from "@/hooks/navigator";

function Users() {
    const [users, setUsers] = useState<User[]>([]);

    const { navigate } = useNavigator();

    const loadUsers = async () => {
        const users: User[] = await new UserAdapter().getRecords();
        setUsers(users);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <main className="flex w-full gap-4 px-20 py-40 justify-center items-stretch flex-wrap">
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}

            <AddCard onClick={() => navigate(NavigatorRoute.ADD_USER)} />
        </main>
    )
}

export default Users