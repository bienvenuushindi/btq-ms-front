import clsx from "clsx";

const Card = ({ className, children }: any) => {
  return (
    <div
      className={clsx(
        " p-2  border border-gray-100 rounded-lg shadow-sm ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;