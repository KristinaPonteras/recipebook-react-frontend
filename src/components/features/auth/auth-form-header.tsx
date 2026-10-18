
type AuthFormHeaderProps = {
    title: string;
    description: string;
};

// Shared heading style for the login and signup forms.
export function AuthFormHeader({
    title,
    description,
}: AuthFormHeaderProps) {
    return (
        <header className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#34483A]">
                {title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#747A71]">
                {description}
            </p>

            <div className="mx-auto mt-5 h-0.5 w-10 rounded-full bg-[#718575]" />
        </header>
    );
}
