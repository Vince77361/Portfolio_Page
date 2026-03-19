interface TechBadgeProps {
  tech: string;
}

export default function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/60">
      {tech}
    </span>
  );
}
