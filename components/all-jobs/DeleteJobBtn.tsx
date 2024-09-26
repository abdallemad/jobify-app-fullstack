import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import JobInfo from './JobInfo';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobAction } from '@/utils/actions';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

function DeleteJobBtn({ jobId }: { jobId: string }) {
  const { toast } = useToast();
  const queryClient= useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => axios.delete('/api/jobs',{params:{jobId:id}}),
    onSuccess: async (data) => {
      if (!data) {
        toast({
          description: 'there was an error',
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['jobs']}); // this not re-fetch
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['charts'] });

      toast({ description: 'job removed' });
    },
  });
  return (
    <Button
      size='sm'
      disabled={isPending}
      onClick={() => {
        mutate(jobId);
      }}
      className='capitalize'
    >
      {isPending ? 'deleting...' : 'delete'}
    </Button>
  );
}
export default DeleteJobBtn;