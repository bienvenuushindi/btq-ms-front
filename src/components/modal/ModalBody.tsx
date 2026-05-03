export default function ModalBody({children}:{
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6 bg-slate-50/60 p-6">
      {children}
    </div>
  );
}
