
import logo from '@/assets/logo.svg'
import Image from "next/image"
function Logo() {
  return (
    <Image src={logo} alt="logo" width={400} height={200} className="object-cover w-40"  />
  )
}

export default Logo
