import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import links from "@/utils/navLinks"
import { AlignLeft } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

function LinksDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'secondary'}>
          <AlignLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} align="center" className="w-48 ">
        {
          links.map(link=>{
            const {label,href,icon} = link;
            return <DropdownMenuItem key={label} className="justify-start">
              <Link href={href}>
                <div className="flex items-center gap-4">{icon} <span className="capitalize flex font-semibold">{label}</span></div>
              </Link>
            </DropdownMenuItem>
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropDown
