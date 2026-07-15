import clsx from "clsx";

const Card = ({ className, children }: any) => {
  return (
    <div
      className={clsx(
        "surface-panel min-w-0 max-w-full rounded-2xl border border-white/60 p-3 sm:rounded-[24px] sm:p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
