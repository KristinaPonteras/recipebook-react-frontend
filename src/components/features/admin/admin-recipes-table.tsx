
import { Table } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import type { AdminRecipe } from "@/services/recipe-service";

export type { AdminRecipe } from "@/services/recipe-service";

type AdminRecipesTableProps = {
    recipes: AdminRecipe[];
    loading: boolean;
};

// Display only: fetching data and handling errors belongs to AdminRecipes.
export function AdminRecipesTable({
    recipes,
    loading,
}: AdminRecipesTableProps) {
    return (
        <Table className="min-w-[1050px]">
            <caption className="sr-only">Recipes from all users</caption>

            <thead>
                <tr>
                    <th scope="col">Recipe</th>
                    <th scope="col">Cuisine</th>
                    <th scope="col">Meal type</th>
                    <th scope="col">Difficulty</th>
                    <th scope="col">Cook time</th>
                    <th scope="col">Owner ID</th>
                    <th scope="col">Owner name</th>
                </tr>
            </thead>

            <tbody>
                {!loading && recipes.length === 0 && (
                    <tr>
                        <td colSpan={7} className="py-12 text-center">
                            <p className="font-medium text-[#34483A]">
                                No recipes yet
                            </p>
                            <p className="mt-1 text-sm text-[#747A71]">
                                Recipes created by users will appear here.
                            </p>
                        </td>
                    </tr>
                )}

                {recipes.map((recipe) => (
                    <tr key={recipe.id}>
                        <td>
                            <div className="flex min-w-48 items-center gap-3">
                                <img
                                    src={recipe.image}
                                    alt=""
                                    loading="lazy"
                                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                                />
                                <span className="font-medium text-[#34483A]">
                                    {recipe.name}
                                </span>
                            </div>
                        </td>

                        <td className="whitespace-nowrap">
                            {recipe.cuisine || "—"}
                        </td>

                        <td className="min-w-36">
                            {recipe.mealType.join(", ") || "—"}
                        </td>

                        <td>
                            <Tag>{recipe.difficulty}</Tag>
                        </td>

                        <td className="whitespace-nowrap">
                            {recipe.cookTimeMinutes} mins
                        </td>

                        <td className="max-w-40">
                            <span
                                className="block truncate font-mono text-xs text-[#747A71]"
                                title={recipe.userId}
                            >
                                {recipe.userId}
                            </span>
                        </td>

                        <td className="whitespace-nowrap">
                            {recipe.ownerName || "Unnamed user"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
