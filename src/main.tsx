
import "@/styles/global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import HomePage from "@/pages/user/home";
import RecipePage from "@/pages/user/recipe";
import AdminPage from "@/pages/admin/home";
import AuthLayout from "@/pages/auth/layout";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";

import { AuthProvider } from "@/components/context/auth-context";
import {
    ProtectedRoute,
    HomeRedirect,
} from "@/components/context/protected-route";

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* Home and default redirects */}
                <Route path="/" element={<HomeRedirect />} />

                {/* Authentication pages */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route
                        index
                        element={<Navigate to="login" replace />}
                    />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignupPage />} />
                </Route>

                {/* User pages */}
                <Route element={<ProtectedRoute role="USER" />}>
                    <Route path="/user" element={<HomePage />} />
                    <Route path="/recipe/:id" element={<RecipePage />} />
                </Route>

                {/* Admin pages */}
                <Route element={<ProtectedRoute role="ADMIN" />}>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>

                {/* Unknown routes */}
                <Route path="*" element={<HomeRedirect />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>,
);
