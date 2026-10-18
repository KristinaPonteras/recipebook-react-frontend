
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import RecipeMeta from "@/components/common/recipe-meta";

type RecipeCardProps = {
    id: string;
    image: string;
    name: string;
    cuisine: string;
    mealType: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    cookTimeMinutes: number;
    tags: string[];
    onDelete: (id: string) => void;
};

export default function RecipeCard({
    id,
    image,
    name,
    cuisine,
    mealType,
    difficulty,
    cookTimeMinutes,
    tags,
    onDelete,
}: RecipeCardProps) {
    return (
        <Card className="group flex h-full flex-col border-[#E5E2D8] bg-white transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(52,72,58,0.09)]">
            <Link
                to={`/recipe/${id}`}
                className="relative block h-56 overflow-hidden bg-[#EDF0E8] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#718575]"
                aria-label={`View ${name}`}
            >
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-[#F7F4EC]/95 px-3 py-1 text-xs font-medium text-[#34483A]">
                    {difficulty}
                </span>
            </Link>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                    {cuisine && (
                        <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.15em] text-[#718575]">
                            {cuisine}
                        </p>
                    )}

                    <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-[#34483A]">
                        {name}
                    </h3>
                </div>

                <RecipeMeta
                    cuisine={cuisine}
                    mealType={mealType}
                    difficulty={difficulty}
                    cookTimeMinutes={cookTimeMinutes}
                />

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                        ))}
                    </div>
                )}

                <div className="mt-auto grid grid-cols-2 gap-3 border-t border-[#EAE8E0] pt-4">
                    <Link to={`/recipe/${id}`} className="block">
                        <Button className="w-full">View Recipe</Button>
                    </Link>

                    <Button
                        variant="secondary"
                        onClick={() => onDelete(id)}
                        className="w-full border-[#EADAD3] bg-[#FAF3EF] text-[#8A4938] hover:bg-[#F5E8E1]"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Card>
    );
}
