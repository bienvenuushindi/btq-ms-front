export default function Container({children}){
  return(
    <main className="h-full flex-col" style={{minWidth: '500px'}}>
      {children}
    </main>
  )
}