export default function Container({children}: {
  children: React.ReactNode
}){
  return(
    <main className="flex h-full w-full min-w-0 flex-col items-center justify-start gap-4 p-0 sm:p-1 lg:p-2">
      {children}
    </main>
  )
}
