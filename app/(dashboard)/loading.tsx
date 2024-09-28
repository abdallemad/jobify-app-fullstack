'use clint'
import LoadingContainer from "@/components/globals/LoadingContainer"
function loading() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <LoadingContainer />
      <LoadingContainer />
      <LoadingContainer />
    </div>
  )
}

export default loading
