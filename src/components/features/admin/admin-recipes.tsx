
import { useEffect, useState } from "react";
import { getAllRecipesService } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { AdminRecipesTable, type AdminRecipe } from "./admin-recipes-table";

// This feature owns the recipe request, refresh button, and request state.
export function AdminRecipes() {
    const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reload, setReload] = useState(0);

    useEffect(() => {
        let active = true;

        async function loadAllRecipes() {
            setLoading(true);
            setError("");

            try {
                const rows = await getAllRecipesService();

                if (active) {
                    setRecipes(rows);
                }
            } catch {
                if (active) {
                    setError("Unable to load recipes. Please try again.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadAllRecipes();

        return () => {
            active = false;
        };
    }, [reload]);

    function handleRefresh() {
        setReload((currentReload) => currentReload + 1);
    }

    return (
        <section aria-label="All recipes" className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E2D8] pb-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#718575]">
                        RECIPE LIBRARY
                    </p>

                    <p className="mt-2 text-sm text-[#747A71]" aria-live="polite">
                        {loading
                            ? "Loading recipes…"
                            : `${recipes.length} ${recipes.length === 1 ? "recipe" : "recipes"
                            } across all users`}
                    </p>
                </div>

                <Button
                    variant="secondary"
                    disabled={loading}
                    onClick={handleRefresh}
                >
                    Refresh
                </Button>
            </div>

            {error ? (
                <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {error}
                </p>
            ) : (
                <AdminRecipesTable recipes={recipes} loading={loading} />
            )}
        </section>
    );
}
