'use client'
import { LuUser2 } from "react-icons/lu"
import { useUser } from "@clerk/nextjs"
const UserIcon = () => {
  const {user,isLoaded} = useUser();
  // console.log(user?.imageUrl)
  if(!isLoaded){
    return <LuUser2 className="h-10 w-10 object-cover rounded-full"/>
  }
  if(user?.imageUrl) return <img src={user?.imageUrl} alt="some text" className="h-10 w-10 object-cover rounded-full"/>

  else return <LuUser2 className="h-6 w-6 bg-primary text-white rounded-full text-sm"/>
}

export default UserIcon
