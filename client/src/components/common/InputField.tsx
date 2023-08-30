
interface InputFieldI {
    value: string
    name?: 'name' | 'calories'
    onChange: (value: string) => void
    isNumeric?: boolean
}
export const  InputField: React.FC<InputFieldI> =  (props) =>  {
    const {onChange, isNumeric, ...rest} = props
    return (
        <div className="relative w-full outline-0 group rounded-[20px] mt-1 lg:mt-2 border border-dark-300 hover:border-dark-500 focus-within:!border-transparent focus-within:before:dark-gradient-2 focus-within:before:-inset-[1px] focus-within:before:rounded-[20px] focus-within:before:p-px">
            <input
                className="w-full px-3 h-16 focus:bg-gradient-2 grow resize-none bg-transparent text-base text-dark-1000 focus:outline-none caret-dark-1000 placeholder-dark-500 hover:placeholder-dark-800 focus:placeholder-dark-300"
                type={isNumeric ? 'number' : 'text'}
                {...rest}
                onChange={e => onChange(e.target.value)}
            />
    </div>
    )
}
