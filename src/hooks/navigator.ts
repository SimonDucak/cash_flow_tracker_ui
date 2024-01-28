import { useMatch, useNavigate } from "react-router-dom";

export enum NavigatorRouteName {
    USERS, 
    ADD_USER, 
    DASHBOARD,
    DASHBOARD_SETTINGS,
    DASHBOARD_SAVING_GOALS,
}

export type NavigatorRoute = {
    routeDefinition: string;
    path: string;
    nestedPath: string;
}

const routes = new Map<NavigatorRouteName, NavigatorRoute>();
   
routes.set(NavigatorRouteName.USERS, {
    routeDefinition: '/',
    path: '/',
    nestedPath: '/',
});

routes.set(NavigatorRouteName.ADD_USER, {
    routeDefinition: '/add-user',
    path: '/add-user',
    nestedPath: 'add-user',
});

routes.set(NavigatorRouteName.DASHBOARD, {
    routeDefinition: '/dashboard/:id/*',
    path: '/dashboard/:id',
    nestedPath: '/dashboard/:id',
});

routes.set(NavigatorRouteName.DASHBOARD_SETTINGS, {
    routeDefinition: '/dashboard/:id/settings',
    path: '/dashboard/:id/settings',
    nestedPath: '/settings',
});

routes.set(NavigatorRouteName.DASHBOARD_SAVING_GOALS, {
    routeDefinition: '/dashboard/:id/saving-goals',
    path: '/dashboard/:id/saving-goals',
    nestedPath: '/saving-goals',
});

export const getRoute = (routeName: NavigatorRouteName): NavigatorRoute => {
    const route = routes.get(routeName);
    if (!route) throw new Error(`Route ${routeName} not found`);
    return route;
};

export const useNavigator = () => {
    const navigate = useNavigate();

    const navigateToUsers = () => {
        navigate(getRoute(NavigatorRouteName.USERS).path);
    };

    const navigateToAddUser = () => {
        navigate(getRoute(NavigatorRouteName.ADD_USER).path);
    };

    const navigateToDashboard = (id: string) => {
        navigate(getRoute(NavigatorRouteName.DASHBOARD).path.replace(':id', id));
    };

    const navigateToDashboardSettings = (id: string) => {
        navigate(getRoute(NavigatorRouteName.DASHBOARD_SETTINGS).path.replace(':id', id));
    };

    const navigateToDashboardSavingGoals = (id: string) => {
        navigate(getRoute(NavigatorRouteName.DASHBOARD_SAVING_GOALS).path.replace(':id', id));
    };

    const IsMatch = (NavigatorRouteName: NavigatorRouteName): boolean => {
        const match = useMatch(getRoute(NavigatorRouteName).routeDefinition.replace("*", ""));
        return !!match;
    }

    return {
        getRoute,
        navigateToUsers,
        navigateToAddUser,
        navigateToDashboard,
        navigateToDashboardSettings,
        navigateToDashboardSavingGoals,
        IsMatch,
    };
}