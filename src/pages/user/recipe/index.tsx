
import { Link, useParams } from "react-router";
import { Section } from "@/components/ui/section";
import { RecipeDetails } from "@/components/features/recipe/recipe-details";

export default function RecipePage() {
    const { id } = useParams();

    return (
        <Section>
            <div className="mx-auto w-full max-w-6xl">
                <Link
                    to="/user"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-[#718575] transition-colors hover:text-[#34483A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#718575]"
                >
                    <span className="transition-transform group-hover:-translate-x-1">
                        ←
                    </span>
                    Back to recipes
                </Link>

                <div className="mt-6">
                    {id && <RecipeDetails key={id} id={id} />}
                </div>
            </div>
        </Section>
    );
}
