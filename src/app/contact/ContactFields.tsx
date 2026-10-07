const fieldClass =
  "mt-3 w-full bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground";

const labelClass =
  "block border-t border-border py-5 focus-within:border-foreground";

export default function ContactFields() {
  return (
    <div className="grid md:grid-cols-2 md:gap-x-8">
      <label className={labelClass} htmlFor="name">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Name
        </span>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldClass}
          placeholder="Your name"
        />
      </label>

      <label className={labelClass} htmlFor="email">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Email
        </span>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          placeholder="you@example.com"
        />
      </label>

      <label className={`${labelClass} md:col-span-2`} htmlFor="message">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Message
        </span>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y leading-relaxed`}
          placeholder="A few lines about what you're working on."
        />
      </label>
    </div>
  );
}
