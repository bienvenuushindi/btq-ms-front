export default function Container({children}: {
  children: React.ReactNode
}){
  return(
    <main className="h-full flex-col" style={{minWidth: '500px'}}>
      {children}
    </main>
  )
}