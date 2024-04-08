import clsx from "clsx";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "border rounded p-2",
        className
      )}
      {...props}
    />
  );
};

export default Input;