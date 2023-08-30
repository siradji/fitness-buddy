
import * as React from "react";
import {InputField} from "@/components/common/InputField";
import clsx from "clsx";


export const EditCal: React.FC<{y: any, x:any, open: boolean, floating: any, strategy: any, cal: string, handleClick: () => void, setCal: (e: any) => void, isSaving: boolean}> = (props) => {

    return (
        <div
            ref={props.floating}
            style={{
                position: props.strategy,
                top: props.y ?? "",
                left: props.x ?? ''
            }}
            className={clsx("absolute z-10 mt-2 w-full w-56 overflow-auto rounded-lg p-px outline-0 z-50",  props.open ? "bg-gradient-2" : "bg-dark-200")}
        >
           <div className="rounded-lg bg-dark-00 pt-4 p-4">
               <InputField value={props.cal}  onChange={(e) => props.setCal(e)} />
               <button className="bg-white outline-2 my-2 border border-white flex flex-row py-2 rounded-[20px] justify-center w-full text-dark-gradient-3 text-center font-bold" disabled={props.isSaving} onClick={() => props.handleClick()}>{props.isSaving ? 'saving': 'save'}</button>
           </div>
        </div>
    );
}
