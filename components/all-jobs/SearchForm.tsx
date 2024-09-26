'use client'
import { useRouter, usePathname,useSearchParams } from "next/navigation"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { 
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "../ui/select"
import { JobStatus } from "@/utils/types"
function SearchForm() {
  // this for the default options
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const jobStatus = searchParams.get("jobStatus") || 'all';

  // this for navigation and path name
  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string
    const status = formData.get('jobStatus') as string
    let params = new URLSearchParams();
    params.set('search',search);
    params.set('jobStatus',status);

    // each time you submit this form the queries will change
    router.push(`${pathname}?${params.toString()}`)
  }
  
  return (
    <form className="bg-muted rounded mb-16 p-8" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-semibold capitalize mb-4">find job</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        <Input type="search" name="search" placeholder="search job" defaultValue={search}/>
        <Select name="jobStatus" defaultValue={jobStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {
              ['all', ...Object.values(JobStatus)].map(jobStatus=>{ 
                return <SelectItem key={jobStatus} value={jobStatus}>
                  {jobStatus}
                </SelectItem>
              })
            }
          </SelectContent>
        </Select>
        <Button type="submit" className="capitalize">search</Button>
      </div>
    </form>
  )
}

export default SearchForm
