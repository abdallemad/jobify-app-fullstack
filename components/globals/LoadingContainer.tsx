import { Skeleton } from "../ui/skeleton"

function LoadingContainer() {
  return (
    <>
      <div className="w-full min-h-44">
        <Skeleton className="w-full h-full rounded"/>
      </div>
    </>
  )
}

export default LoadingContainer
