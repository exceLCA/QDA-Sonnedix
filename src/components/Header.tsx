export default function Header() {
  return (
    <header className="bg-navy">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-cyan text-sm font-bold tracking-tight text-white shadow-md">
          QDA
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold leading-tight text-white">
            Quality Document Analyzer
          </h1>
          <p className="text-sm leading-tight text-slate-300">
            Sonnedix Italy — AI-Powered Compliance Engine
          </p>
        </div>
      </div>
    </header>
  );
}
