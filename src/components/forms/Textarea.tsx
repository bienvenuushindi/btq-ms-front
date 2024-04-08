import clsx from "clsx";

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={clsx(
        "border rounded p-2",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;