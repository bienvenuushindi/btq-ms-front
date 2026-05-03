import clsx from "clsx";

const Card = ({ className, children }: any) => {
  return (
    <div
      className={clsx(
        "surface-panel rounded-[24px] border border-white/60 p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
