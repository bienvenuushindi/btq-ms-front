import clsx from "clsx";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "border-solid border-gray border-2 px-3 py-2 text-lg rounded-2xl w-full",
        className
      )}
      {...props}
    />
  );
};

export default Input;