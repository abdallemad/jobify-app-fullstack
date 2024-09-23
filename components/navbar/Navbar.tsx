'use client';
import ModeToggle from "./ModeToggle"
import LinksDropDown from "./LinksDropDown";
import UserIcon from "./UserIcon";
import { UserButton } from "@clerk/nextjs";
function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4  px-12 bg-muted sm:px-16 lg:px-24">
      <div className="lg:hidden">
        <LinksDropDown />
      </div>
      <div className="lg:ml-auto flex gap-x-4 items-center">
        <ModeToggle />
        <UserButton />
        {/* <UserIcon /> */}
      </div>
    </nav>
  )
}

export default Navbar
