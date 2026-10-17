export function AdminHeading({
  kicker,
  title,
  hint,
}: {
  kicker: string;
  title: string;
  hint?: string;
}) {
  return (
    <div className="relative">
      <p className="font-latin text-[11px] uppercase tracking-[0.24em] text-[#C084FC]">{kicker}</p>
      <h1 className="holo-title title-3d mt-1 text-3xl font-black md:text-4xl">{title}</h1>
      {hint ? <p className="mt-2 max-w-2xl text-sm text-[#94A3B8]">{hint}</p> : null}
    </div>
  );
}
