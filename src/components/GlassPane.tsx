import clsx from 'clsx';

const GlassPane = ({children, className}) => {
  return <div className={clsx(
    'flex min-h-screen',
    className
  )}>
    {children}
  </div>;
};


export default GlassPane;