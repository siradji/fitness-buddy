import {PropsWithChildren} from "react";

export const Card: React.FC<PropsWithChildren<{heading: string}>> =  (props) => {
    return (
        <div
            className="dark-card-bg-image rounded-[20px] border backdrop-blur-[18px] border border-dark-200"
        >
            <div className="p-5">
                <div>
                    <h3>{props.heading}</h3>
                </div>
               <div className="font-bold text-center text-3xl mt-2">
                   {props.children}
               </div>
            </div>
        </div>
    )
}
