"use client";

export default function Footer() {
  return (
    <footer className="py-6 border-t border-[rgb(var(--muted))]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-[rgb(var(--primary))]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
          <p className="text-sm text-[rgb(var(--muted-foreground))] text-center">
            © {new Date().getFullYear()} Finance Manager. All rights reserved.
            Developed by{" "}
            <a
              href="https://my-protfolio-jt.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(var(--primary))] hover:underline font-medium transition-colors"
            >
              @Joy Tarafder
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
