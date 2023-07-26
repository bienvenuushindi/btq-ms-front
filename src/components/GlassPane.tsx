import clsx from 'clsx';

const GlassPane = ({children, className}) => {
  return <div className={clsx(
    'glass',
    className
  )}>
    {children}
  </div>;
};


export default GlassPane;