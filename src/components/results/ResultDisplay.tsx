
import ProgressDemo from "@/components/ui/Progress"
import NoProgress from "@/components/ui/NoProgress"
type Props={
    yesTotal : number;
    noTotal: number;
}

export function ResultDisplay(props: Props){
   
    return (
        <div className="text-gray-900">
            <div>
                <div className="rounded-full">
                    Votes Yes: {props.yesTotal} <br />
                </div>
                <ProgressDemo value = {props.yesTotal} max = {props.yesTotal + props.noTotal}/>
            </div>
            <div>
                <div className="rounded-full">
                    Votes No: {props.noTotal}
                </div>
                <NoProgress value = {props.noTotal} max = {props.yesTotal + props.noTotal}/>
            </div> 
        </div>
    )
    
}

