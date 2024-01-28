import { useNavigate } from "react-router-dom";

export enum NavigatorRoute {
    USERS, 
    ADD_USER, 
    DASHOBARD,
}

export const useNavigator = () => {
    const navigate = useNavigate(); 

    return {
        navigate: (route: NavigatorRoute) => {
            navigate(getPath(route));
        },
    }
}

export const getPath = (route: NavigatorRoute): string => {
    switch (route) {
        case NavigatorRoute.USERS:
            return '/';
        case NavigatorRoute.ADD_USER:
            return '/users/add';
        case NavigatorRoute.DASHOBARD:
            return '/dashboard';
        default:
            return '/';
    }
}