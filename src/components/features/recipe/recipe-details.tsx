
import { useEffect, useState } from "react";
import { getRecipeService, type Recipe } from "@/services/recipe-service";

import RecipeMeta from "@/components/common/recipe-meta";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import UpdateRecipeForm from "@/components/features/recipe/update-recipe-form";

export function RecipeDetails({ id }: { id: string }) {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadRecipe(recipeId: string) {
            try {
                const result = await getRecipeService(recipeId);

                if (active) {
                    setRecipe(result);
                }
            } catch {
                if (active) {
                    setError("Recipe not found, or you do not have access to it.");
                }
            }
        }

        loadRecipe(id);

        return () => {
            active = false;
        };
    }, [id]);

    function openForm() {
        setOpen(true);
    }

    function closeForm() {
        setOpen(false);
    }

    function handleUpdated(updatedRecipe: Recipe) {
        setRecipe(updatedRecipe);
        closeForm();
    }

    return (
        <>
            {error ? (
                <p
                    role="alert"
                    className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                    {error}
                </p>
            ) : recipe ? (
                <div className="mt-8">
                    <Card className="overflow-hidden border-0 bg-transparent">
                        <div className="relative overflow-hidden rounded-2xl bg-[#E9EDE4]">
                            <img
                                className="h-64 w-full object-cover sm:h-[440px]"
                                src={recipe.image}
                                alt={recipe.name}
                            />
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
                        </div>

                        <div className="px-1 py-7 sm:px-2 sm:py-10">
                            <div className="flex flex-col gap-5 border-b border-[#E5E2D8] pb-7 sm:flex-row sm:items-start sm:justify-between">
                                <div className="max-w-3xl">
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#718575]">
                                        FROM YOUR RECIPE COLLECTION
                                    </p>

                                    <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#34483A] sm:text-5xl">
                                        {recipe.name}
                                    </h1>

                                    {recipe.cuisine && (
                                        <p className="mt-3 text-sm text-[#747A71]">
                                            {recipe.cuisine}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    onClick={openForm}
                                    className="shrink-0 self-start"
                                >
                                    Update Recipe
                                </Button>
                            </div>

                            <div className="border-b border-[#E5E2D8] py-5">
                                <RecipeMeta
                                    cuisine={recipe.cuisine}
                                    mealType={recipe.mealType}
                                    difficulty={recipe.difficulty}
                                    cookTimeMinutes={recipe.cookTimeMinutes}
                                />

                                {recipe.tags.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {recipe.tags.map((tag) => (
                                            <Tag key={tag}>{tag}</Tag>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                                <section>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#718575]">
                                        WHAT YOU NEED
                                    </p>

                                    <h2 className="mb-5 text-2xl font-semibold tracking-tight text-[#34483A]">
                                        Ingredients
                                    </h2>

                                    <ul className="space-y-3 text-sm leading-7 text-[#59665B]">
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li
                                                key={`${ingredient}-${index}`}
                                                className="flex items-start gap-3"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#718575]"
                                                />
                                                <span>{ingredient}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#718575]">
                                        LET'S GET COOKING
                                    </p>

                                    <h2 className="mb-5 text-2xl font-semibold tracking-tight text-[#34483A]">
                                        Instructions
                                    </h2>

                                    <ol className="space-y-5 text-sm leading-7 text-[#59665B]">
                                        {recipe.instructions.map((instruction, index) => (
                                            <li
                                                key={`${instruction}-${index}`}
                                                className="flex items-start gap-4"
                                            >
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDF0E8] text-xs font-semibold text-[#34483A]">
                                                    {index + 1}
                                                </span>

                                                <span className="pt-0.5">{instruction}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </section>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : null}

            {recipe && (
                <Modal open={open} onClose={closeForm} title="Update Recipe">
                    <UpdateRecipeForm
                        recipe={recipe}
                        onSuccess={handleUpdated}
                    />
                </Modal>
            )}
        </>
    );
}
