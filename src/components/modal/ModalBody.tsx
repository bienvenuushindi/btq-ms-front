export default function ModalBody({children}:{
  children: React.ReactNode
}) {
  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-slate-50/60 p-6">
      {children}
    </div>
  );
}
