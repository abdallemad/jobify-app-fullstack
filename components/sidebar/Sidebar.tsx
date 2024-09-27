'use client';
import links from "@/utils/navLinks";
import Logo from "./Logo"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button";
import Link from "next/link";
function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-muted h-full">
      <Logo />
      <div className="flex flex-col mt-20 gap-y-4 sticky top-10">
        {
          links.map(link=>{

            return <Button key={link.href} asChild variant={pathname == link.href? 'default':'link'}>
              <Link href={link.href}>{link.icon} <span className="ml-2 capitalize">{link.label}</span></Link>
            </Button>
          })
        }
      </div>
    </aside>
  )
}

export default Sidebar
