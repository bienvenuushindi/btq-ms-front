import clsx from "clsx";

const Card = ({ className, children }) => {
  return (
    <div
      className={clsx(
        " p-2 bg-white border border-gray-100 rounded-lg shadow-sm -dark:bg-gray-800 dark:border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;