
type RecipeMetaProps = {
    cuisine: string;
    mealType: string[];
    difficulty: string;
    cookTimeMinutes: number;
};

export default function RecipeMeta({
    cuisine,
    mealType,
    difficulty,
    cookTimeMinutes,
}: RecipeMetaProps) {
    return (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
            <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[#718575]">
                    Cuisine
                </dt>
                <dd className="mt-1.5 font-medium text-[#34483A]">
                    {cuisine || "—"}
                </dd>
            </div>

            <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[#718575]">
                    Meal type
                </dt>
                <dd className="mt-1.5 leading-5 text-[#34483A]">
                    {mealType.join(", ") || "—"}
                </dd>
            </div>

            <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[#718575]">
                    Difficulty
                </dt>
                <dd className="mt-1.5 font-medium text-[#34483A]">
                    {difficulty}
                </dd>
            </div>

            <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[#718575]">
                    Cook time
                </dt>
                <dd className="mt-1.5 font-medium text-[#34483A]">
                    {cookTimeMinutes} mins
                </dd>
            </div>
        </dl>
    );
}
