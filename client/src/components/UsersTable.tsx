import {PropsWithChildren} from "react";
import clsx from "clsx";

export function UsersTable (props: PropsWithChildren<{}>) {
    return (
        <div className="flex mt-10 flex-col dark-card-bg-image rounded-[20px] border backdrop-blur-[18px] border border-dark-200">
            <div className="p-5">
                {props.children}
            </div>
        </div>
    )
}


const UserTableHeader = (props: PropsWithChildren<{}>) => {
    return (
        <div className="flex flex-row w-full justify-between items-center">
            {props.children}
        </div>
    )
}

const UserTableHead = (props: {label: string, width: string}) => {
    return (
        <div className={clsx('text-center ', props.width)}>
            <span className="font-bold">{props.label}</span>
        </div>
    )
}


const UserTableRow = (props: PropsWithChildren<{}>) => {
    return (
        <div className="flex flex-row w-full justify-between items-center mt-5">
            {props.children}
        </div>
    )
}

const UserRowItem = (props: PropsWithChildren<{}>) => {
    return (
        <div className="text-center">
            <span className="">{props.children}</span>
        </div>
    )
}
UsersTable.UserTableHeader = UserTableHeader;
UsersTable.UserTableHead = UserTableHead;
UsersTable.UserTableRow = UserTableRow;
UsersTable.UserRowItem = UserRowItem;
