
'use client'
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
                    Votes Yes: {props.yesTotal}: {(props.yesTotal / (props.yesTotal + props.noTotal) * 100).toFixed(2)}%<br />
                </div>
                <div className="flex">
                <ProgressDemo value = {props.yesTotal} max = {props.yesTotal + props.noTotal}/>
                </div>
            </div>
            <div>
                <div className="rounded-full">
                    Votes No: {props.noTotal}: {(props.noTotal / (props.yesTotal + props.noTotal) * 100).toFixed(2)}%
                </div>
                <div className="flex">
                <NoProgress value = {props.noTotal} max = {props.yesTotal + props.noTotal}/>
                </div>
            </div> 
        </div>
    )
    
}

