export default function Container({children}: {
  children: React.ReactNode
}){
  return(
    <main className="flex h-full min-w-[320px] flex-col items-center justify-start gap-4 p-1 lg:p-2">
      {children}
    </main>
  )
}
