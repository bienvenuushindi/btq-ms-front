export default function ContainerOne({children}) {
  return (
    <div className="w-full h-full container py-8 mx-auto flex flex-col items-start">
          {children}
    </div>
  )
}