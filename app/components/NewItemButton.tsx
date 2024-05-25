import React from 'react'

interface NewItemButtonProps {
    addItem: React.MouseEventHandler<HTMLDivElement>;
}

const NewItemButton: React.FC<NewItemButtonProps> = ({ addItem }) => {
    return (
        <div className="flex rounded-full bg-[#96C45D] h-[87px] w-[87px] self-center justify-center items-center cursor-pointer" onClick={addItem}>
            <h1 className="text-white text-[50px] mb-1">+</h1>
        </div>
    );
}

export default NewItemButton;
