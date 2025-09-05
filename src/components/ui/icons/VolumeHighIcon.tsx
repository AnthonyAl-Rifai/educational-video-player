interface IconProps {
  className?: string;
  size?: number;
}

export default function VolumeHighIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 10v4h4l5 5V5l-5 5H3z" />
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z" />
      <path d="M14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.45-.52 8-4.31 8-8.77s-3.55-8.25-8-8.77z" />
    </svg>
  );
}
