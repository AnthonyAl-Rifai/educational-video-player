interface IconProps {
  className?: string;
  size?: number;
}

export default function VolumeLowIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 10v4h4l5 5V5l-5 5H3z" />
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z" />
    </svg>
  );
}
