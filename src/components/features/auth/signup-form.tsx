
import { useNavigate } from "react-router";
import { useState, type SubmitEvent } from "react";
import { useAuth } from "@/components/context/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getErrorMessage(error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = (
            error as { response?: { data?: { message?: string } } }
        ).response;

        if (response?.data?.message) return response.data.message;
    }

    return "Could not connect to the API. Check that the API server is running.";
}

export function SignupForm() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setBusy(true);

        try {
            const currentUser = await signup(name, email, password);
            const destination =
                currentUser.role === "ADMIN" ? "/admin" : "/user";

            navigate(destination, { replace: true });
        } catch (requestError) {
            setError(getErrorMessage(requestError));
        } finally {
            setBusy(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
            <div>
                <Label htmlFor="auth-name">Full name</Label>
                <Input
                    id="auth-name"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                />
            </div>

            <div>
                <Label htmlFor="auth-email">Email address</Label>
                <Input
                    id="auth-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <Label htmlFor="auth-password">Password</Label>
                <Input
                    id="auth-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a password"
                />
                <p className="mt-2 text-xs leading-5 text-[#747A71]">
                    Use at least 8 characters, including one uppercase letter and one
                    number.
                </p>
            </div>

            {error && (
                <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {error}
                </p>
            )}

            <Button
                type="submit"
                disabled={busy}
                className="mt-1 w-full py-3 disabled:cursor-wait disabled:opacity-60"
            >
                {busy ? "Please wait…" : "Create account"}
            </Button>
        </form>
    );
}
