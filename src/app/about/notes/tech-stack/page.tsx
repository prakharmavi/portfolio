import Link from "next/link";

export default function TechStackDeepPage() {
  const stack: { title: string; items: string[] }[] = [
    {
      title: "Full-Stack Development",
      items: [
        "React",
        "Next.js",
        "Tailwind",
        "Node.js",
        "Express",
        "Medusa.js",
        "React Native",
        "Swift (iOS)",
      ],
    },
    {
      title: "Backend & Databases",
      items: [
        "PostgreSQL (Neon, PlanetScale)",
        "Redis/Valkey",
        "Prisma ORM",
        "REST & GraphQL APIs",
      ],
    },
    {
      title: "Cloud & Infrastructure",
      items: ["Vercel", "Fly.io", "GCP", "AWS", "Cloudflare", "Docker"],
    },
    {
      title: "Auth & Payments",
      items: ["Clerk", "NextAuth", "Firebase Auth", "Stripe", "Razorpay", "Paytm"],
    },
    {
      title: "AI & Automation",
      items: [
        "OCR (OpenCV)",
        "Generative AI apps (resume optimizer, document scanning)",
        "workflow automation (n8n)",
      ],
    },
    {
      title: "UI/UX & Design",
      items: [
        "Modern responsive design",
        "Tailwind",
        "Blender/Rive animations",
        "interactive 3D web experiences",
      ],
    },
    {
      title: "Other Strengths",
      items: [
        "Debugging & performance optimization",
        "SaaS product development",
        "rapid prototyping",
        "e-commerce systems",
      ],
    },
  ];

  return (
    <main className="px-6 md:px-10 py-10">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Tech Notes</h1>
          <Link href="/#about" className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-4">
            Back to About
          </Link>
        </div>
        <p className="text-gray-600 text-sm">A deeper inventory of tools and platforms I’ve worked with.</p>

        <section className="relative bg-white border border-gray-200 rounded-[24px] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stack.map((cat) => (
              <article key={cat.title} className="border border-gray-200 rounded-2xl p-4">
                <h2 className="text-sm font-medium text-gray-900">{cat.title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-4">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
