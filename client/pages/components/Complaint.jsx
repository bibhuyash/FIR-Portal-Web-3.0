import React, { useState } from 'react'
import {useContract, useContractRead, useContractWrite} from "@thirdweb-dev/react";
import { Toaster } from 'react-hot-toast';
function Complaint() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
    const { data, isLoading } = useContractRead(contract, "nextId")
    const { mutateAsync: fileComplaint } = useContractWrite(contract, "fileComplaint")
    return (
        <div className='complaint-container md:mr-[50px] md:ml-[50px]'>
            <p className='complaint-title-red'>File Your Complaint Here:</p>
            <div className='md:flex items-center'>
                <p className='complaint-text-margin mr-[75px]'>Title:</p>
                <input type="text" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Title Here' />
            </div>

            <div className='md:flex items-center'>
                <p className='complaint-text-margin '>Description:</p>
                <input type="text" className='container-input md:w-[500px] w-[300px]' placeholder='Enter Description Here' />
            </div>
            <button className='button-common hover:bg-blue-900'>File Complaint</button>
        </div>
    )
}

export default Complaint 