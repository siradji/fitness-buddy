import {ReactNode} from "react";


interface InputFieldI {
    value: string
    name: 'name' | 'calories'
    onChange: (name: 'name' | 'calories', value: string) => void
    isNumeric?: boolean
}
export function InputField (props: InputFieldI): ReactNode {
    const {onChange, isNumeric, ...rest} = props
    return (
        <div className="relative w-full outline-0 group rounded-[20px] mt-1 lg:mt-2 border border-dark-300 hover:border-dark-500 focus-within:!border-transparent focus-within:before:dark-gradient-2 focus-within:before:-inset-[1px] focus-within:before:rounded-[20px] focus-within:before:p-px">
            <input
                className="w-full px-3 h-16 grow resize-none bg-transparent text-base text-dark-1000 focus:outline-none caret-dark-1000 placeholder-dark-500 hover:placeholder-dark-800 focus:placeholder-dark-300"
                type={isNumeric ? 'number' : 'text'}
                {...rest}
                onChange={e => onChange(props.name, e.target.value)}
            />
    </div>
    )
}
