import React from "react";
import clsx from "clsx";

export const AddEntryButton: React.FC<{onClick: () => void, disabled?: boolean, loading: boolean}> = ({onClick, loading, disabled}) => {
    return (
        <button
            data-testid="wallet-button"
            type="button"
            disabled={loading}
            onClick={onClick}
            className={clsx(
                `w-full hover:dark-btn-hover active:dark-btn-pressed dark-card-bg flex h-8 items-center rounded-[48px]
        border-[0.5px] border-dark-card-stroke px-3 py-2 hover:border-transparent md:h-[52px] lg:h-12 md:pl-2.5 md:pr-7 lg:py-1.5`
            )}
        >
                <div className="ml-2 flex flex-row w-full items-center justify-center">
                    {loading ? (
                        <div className=" text-center text-dark-1000 font-bold text-xl">Adding Food Entry...</div>
                        ): (
                        <div className=" text-center text-dark-1000 font-bold text-xl">Add entry</div>
                    )}
                </div>
        </button>
    )
}
