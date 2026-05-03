import Dot from '@/components/utils/Dot';

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
    <span
      title={label}
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <Dot
        variant={active ? 'success' : 'danger'}
        size="small"
        className="mr-0"
      />
    </span>
  );
}
