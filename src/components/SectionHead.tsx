export function SectionHead({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-flex px-3 py-1 rounded-full glass text-[11px] uppercase tracking-widest text-primary">
        {kicker}
      </div>
      <h2 className="mt-4 text-3xl sm:text-5xl font-bold gradient-text">{title}</h2>
      {body && <p className="mt-4 text-muted-foreground">{body}</p>}
    </div>
  );
}