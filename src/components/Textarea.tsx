import clsx from "clsx";

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={clsx(
        "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;