import { FOOTER_ITEM } from "@/lib/constants";

const ICONS: Record<string, React.ReactNode> = {
  email: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  instagram: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  discord: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  github: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

export default function Footer() {
  const contacts = Object.entries(FOOTER_ITEM) as [
    keyof typeof FOOTER_ITEM,
    { name: string; href: string }
  ][];

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-baseline justify-between gap-4 border-b border-zinc-800 pb-3 mb-10">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
            <span className="text-accent-400">04</span> &nbsp;—&nbsp; Contact
          </span>
          <span className="hidden sm:inline font-mono text-[11px] tracking-[0.25em] text-zinc-600">
            End of page
          </span>
        </div>

        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <p className="font-display text-5xl md:text-7xl text-zinc-50 uppercase leading-none">
              이유비
            </p>
            <p className="mt-4 font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500">
              Web / Mobile Developer
            </p>
          </div>

          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-5">
              ↳ Reach out
            </p>
            <ul className="divide-y divide-zinc-900 border-y border-zinc-900">
              {contacts.map(([key, { name, href }]) => {
                const content = (
                  <div className="grid grid-cols-12 gap-x-4 items-center py-4">
                    <span className="col-span-12 sm:col-span-3 md:col-span-2 font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500">
                      {key}
                    </span>
                    <span className="col-span-11 sm:col-span-8 md:col-span-9 mt-2 sm:mt-0 flex min-w-0 items-center gap-3 text-sm text-zinc-200 break-all">
                      <span className="text-zinc-400">{ICONS[key]}</span>
                      {name}
                    </span>
                    <span className="col-span-1 mt-2 sm:mt-0 text-right text-zinc-600 group-hover:text-zinc-200 transition-colors">
                      {href ? "↗" : "—"}
                    </span>
                  </div>
                );

                if (!href) {
                  return (
                    <li
                      key={key}
                      className="text-zinc-500 group cursor-default"
                    >
                      {content}
                    </li>
                  );
                }

                return (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-zinc-300 hover:text-accent-300 hover:bg-zinc-900/60 transition-colors group"
                    >
                      {content}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-5 border-t border-zinc-900 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between font-mono text-[11px] tracking-[0.2em] uppercase text-zinc-600">
          <p>© {new Date().getFullYear()} Lee Yubi</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
