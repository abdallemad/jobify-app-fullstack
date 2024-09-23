
import type { Control } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';

export function CustomField({name,control}:{name:string,control:Control<any>}){
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='capitalize'>{name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type CustomFormSelectProps = {
  name: string,
  control: Control<any>,
  items:string[],
  labelText?:string,
}
export function CustomSelect({name,control,items,labelText}:CustomFormSelectProps) {
  return (
    <FormField 
      control={control} 
      name={name} 
      
      render={({field})=>{
        return <FormItem>
          <FormLabel className='capitalize'>{labelText || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue  defaultValue={items[0]}/>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {
                items.map(item=>{
                  return  <SelectItem value={item} key={item}>{item}</SelectItem>
                })
              }
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      }}
    />
  )
}
