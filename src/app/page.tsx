import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen py-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--primary))]/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--accent))]/5 to-transparent" />

        {/* Animated circles */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[rgb(var(--primary))]/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[rgb(var(--accent))]/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[rgb(var(--primary))]/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <Dashboard />
    </main>
  );
}
