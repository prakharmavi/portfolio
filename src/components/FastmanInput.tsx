import AskMeInput from "@/components/AskMeInput";

export default function FastmanInput() {
  return (
    <div className="not-prose my-8">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
        <p className="mb-3 text-sm font-medium text-gray-500">Try asking Prakhar something</p>
        <AskMeInput placeholder="What's your background?" />
      </div>
    </div>
  );
}
