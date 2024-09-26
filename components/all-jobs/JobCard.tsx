import { JobType } from '@/utils/types';
import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import JobInfo from './JobInfo';
import DeleteJobBtn from './DeleteJobBtn';
import { QueryClient } from '@tanstack/react-query';
function JobCard({job}:{job:JobType}) {
  const date = new Date(job.createdAt).toLocaleString()
  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle className='capitalize text-2xl'>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator className='bg-muted-foreground'/>
      <CardContent className='mt-4 grid grid-cols-2 gap-4'>
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className='w-32 justify-center rounded-full'>
          <JobInfo icon={<RadioTower className='w-4 h-4'/>} text={job.status}/>
        </Badge>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button asChild size={'sm'} className='capitalize'><Link href={`/jobs/${job.id}`}>edit</Link></Button>
        <DeleteJobBtn jobId={job.id} />
      </CardFooter>
    </Card>
  )
}

export default JobCard
