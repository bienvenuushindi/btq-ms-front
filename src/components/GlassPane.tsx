import clsx from 'clsx';

const GlassPane = ({children, className}:any) => {
  return <div className={clsx(
    'flex min-h-screen',
    className
  )}>
    {children}
  </div>;
};


export default GlassPane;