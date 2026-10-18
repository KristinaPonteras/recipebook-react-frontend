
import { useEffect, useState } from "react";
import { useAuth } from "@/components/context/use-auth";
import {
    deleteRecipeService,
    getRecipesService,
    type Recipe,
} from "@/services/recipe-service";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/features/recipe/recipe-card";
import AddRecipeForm from "@/components/features/recipe/add-recipe-form";
import { Navigate } from "react-router";

export function RecipeCollection() {
    const { user, ready } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!ready || !user) {
            return;
        }

        let active = true;

        async function loadRecipes() {
            try {
                const result = await getRecipesService();

                if (active) {
                    setRecipes(result);
                    setError("");
                }
            } catch {
                if (active) {
                    setError("Unable to load recipes. Please try again.");
                }
            }
        }

        loadRecipes();

        return () => {
            active = false;
        };
    }, [ready, user]);

    async function handleDelete(id: string) {
        if (!confirm("Do you want to delete this recipe?")) return;

        try {
            await deleteRecipeService(id);
            setRecipes((current) =>
                current.filter((recipe) => recipe.id !== id),
            );
        } catch {
            setError("Unable to delete this recipe. Please try again.");
        }
    }

    if (!ready) return null;

    if (!user) return <Navigate to="/auth/login" replace />;

    function openForm() {
        setOpen(true);
    }

    function closeForm() {
        setOpen(false);
    }

    function handleCreated(newRecipe: Recipe) {
        setRecipes((currentRecipes) => [newRecipe, ...currentRecipes]);
        closeForm();
    }

    return (
        <>
            <section className="space-y-7">
                <div className="flex flex-col justify-between gap-5 border-b border-[#E5E2D8] pb-6 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#718575]">
                            YOUR PERSONAL COOKBOOK
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight text-[#34483A] sm:text-4xl">
                            Your recipes
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#747A71]">
                            {recipes.length} saved{" "}
                            {recipes.length === 1 ? "recipe" : "recipes"} to inspire your
                            next meal.
                        </p>
                    </div>

                    <Button onClick={openForm} className="self-start sm:self-auto">
                        + Add Recipe
                    </Button>
                </div>

                {error && (
                    <p
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {error}
                    </p>
                )}

                {recipes.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#DCE2D8] bg-[#FAF9F5] px-6 py-16 text-center">
                        <span
                            aria-hidden="true"
                            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF0E8] text-2xl text-[#718575]"
                        >
                            ♧
                        </span>

                        <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#34483A]">
                            A fresh page for your favorites
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#747A71]">
                            Save a family classic or add something new you'd love to try.
                            Your collection starts here.
                        </p>

                        <Button className="mt-6" onClick={openForm}>
                            Add your first recipe
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                {...recipe}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </section>

            <Modal open={open} onClose={closeForm} title="Add Recipe">
                <AddRecipeForm onSuccess={handleCreated} />
            </Modal>
        </>
    );
}
