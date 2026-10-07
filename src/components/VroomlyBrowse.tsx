export default function VroomlyBrowse() {
  return (
    <div className="not-prose my-10 border-y border-foreground py-6">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Open Vroomly</p>
          <p className="text-sm text-muted-foreground">Browse local cars or publish a listing.</p>
        </div>
        <div className="flex gap-2">
          <a
            href="https://vroomly.pmavi.com/cars"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            Browse cars
          </a>
          <a
            href="https://vroomly.pmavi.com/auth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium text-foreground hover:border-border hover:text-muted-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"/></svg>
            List your car
          </a>
        </div>
      </div>
    </div>
  );
}
