interface PrizeBadgeProps {
  prize: string;
}

function getPrizeBadgeStyle(prize: string): string {
  if (prize.includes("대상") || prize.includes("최우수상")) {
    return "bg-cyan-400/20 text-cyan-300 border-cyan-400/40";
  } else if (prize.includes("1위") || prize.includes("금상")) {
    return "bg-yellow-400/20 text-yellow-300 border-yellow-400/40";
  } else if (prize.includes("2위") || prize.includes("은상")) {
    return "bg-slate-400/20 text-slate-300 border-slate-400/40";
  } else if (prize.includes("3위") || prize.includes("동상")) {
    return "bg-amber-700/20 text-amber-400 border-amber-600/40";
  }
  // else -> 특별상 및 장려상 등
  return "bg-violet-500/20 text-violet-300 border-violet-500/30";
}

export default function PrizeBadge({ prize }: PrizeBadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getPrizeBadgeStyle(prize)}`}
    >
      {prize}
    </span>
  );
}
