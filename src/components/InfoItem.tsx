import Text from '@/components/Text';
import clsx from 'clsx';

export default function InfoItem({label, value, children,classValue, classLabel, row = false}) {
  return (
    <div className={clsx('flex pb-2', row ? 'flex-row' : 'flex-col')}>
      <Text size="small" intent="secondary" className="font-bold">{label}:</Text>
      <Text size="medium" intent="secondary" className="">{value}</Text>
    </div>
  );
}