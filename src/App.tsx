import { ThemeProvider } from "@/components/theme-provider"
import Users from "@/pages/users"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "@/pages/add-user";
import { NavigatorRoute, getPath } from "@/hooks/navigator";
import Dashboard from "@/pages/dashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="relative flex min-h-screen flex-col bg-background">
            <Router>
                <Routes>
                    <Route path={getPath(NavigatorRoute.USERS)} element={<Users />} />
                    <Route path={getPath(NavigatorRoute.ADD_USER)} element={<AddUser />} />
                    <Route path={getPath(NavigatorRoute.DASHOBARD)} element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    </ThemeProvider>
  )
}

export default App
