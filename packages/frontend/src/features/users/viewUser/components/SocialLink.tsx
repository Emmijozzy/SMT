import { ElementType } from "react";

export function SocialLink({ icon: Icon, url, label }: { icon: ElementType; url: string; label: string }) {
  return (
    <a aria-label={label} href={url || "https://"} target="_blank" className="cursor-pointer" rel="noreferrer">
      <Icon className="w-7 h-7" />
    </a>
  );
}
