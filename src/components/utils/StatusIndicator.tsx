import Badge from '@/components/utils/Badge';

type StatusIndicatorProps = {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
};

export default function StatusIndicator({
  active,
  activeLabel = 'Active',
  inactiveLabel = 'Inactive',
  className = '',
}: StatusIndicatorProps) {
  const label = active ? activeLabel : inactiveLabel;

  return (
    <Badge
      title={label}
      aria-label={label}
      variant={active ? 'success' : 'danger'}
      size="small"
      className={`px-3 py-1 font-semibold ${className}`}
    >
      {label}
    </Badge>
  );
}
