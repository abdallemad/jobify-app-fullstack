
import { 
  Card,
  CardHeader,
  CardTitle
} from "../ui/card"

function StatsCard({title,amount}:{title:string,amount:number}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-2xl ">
          {title} <span className="text-primary font-bold">{amount}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default StatsCard
