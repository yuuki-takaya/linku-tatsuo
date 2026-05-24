import { Tag } from "@/types";

interface TagBadgeProps {
  tag: Tag;
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="inline-block text-xs text-gray-500 border border-gray-200 rounded-sm px-2 py-0.5 tracking-wide">
      {tag.label}
    </span>
  );
}
