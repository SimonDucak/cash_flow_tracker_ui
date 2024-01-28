import { ThemeProvider } from "@/components/theme-provider";
import Users from "@/pages/users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "@/pages/add-user";
import { NavigatorRouteName, getRoute } from "@/hooks/navigator";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col bg-background">
        <Router>
          <Routes>
            <Route
              path={getRoute(NavigatorRouteName.USERS).routeDefinition}
              element={<Users />}
            />

            <Route
              path={getRoute(NavigatorRouteName.ADD_USER).routeDefinition}
              element={<AddUser />}
            />

            <Route
              path={getRoute(NavigatorRouteName.DASHBOARD).routeDefinition}
              element={<Dashboard />}
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
