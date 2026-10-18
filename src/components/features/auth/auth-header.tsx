
// Shared branding for the login and signup pages.
export function AuthHeader() {
    return (
        <header className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#34483A] text-2xl text-[#F7F4EC]">
                ♧
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#718575]">
                Your kitchen companion
            </p>

            <h1 className="text-4xl font-semibold tracking-tight text-[#34483A] sm:text-5xl">
                Recipe Book
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#747A71]">
                Keep your favorite meals in one place.
            </p>
        </header>
    );
}
