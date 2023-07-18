import clsx from 'clsx';

const SelectInput = ({children, className, ...props}) => {
  return (
    <select
      className={clsx(
        'border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default SelectInput;