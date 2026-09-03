import AskMeInput from "@/components/AskMeInput";

export default function FastmanInput() {
  return (
    <div className="not-prose my-10 border-y border-gray-900 py-6">
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em] text-gray-500">Ask about the work</p>
        <AskMeInput placeholder="What's your background?" />
      </div>
    </div>
  );
}
