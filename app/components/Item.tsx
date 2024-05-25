import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

interface Item {
    text: string;
}

const Item = ( props: Item ) => {
  return (
    <div className="bg-[#96C45D] rounded-lg h-20 w-full flex items-center p-5 gap-[30px]">
        <div className="w-[30px] h-[30px] bg-white rounded-lg cursor-pointer">

        </div>
        <h1 className="text-[40px] text-black flex-grow ">
            {props.text}
        </h1>
        <CloseIcon color="primary" fontSize="large" className="flex self-end cursor-pointer"/>
    </div>
  )
}

export default Item