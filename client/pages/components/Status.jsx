import React, { useState } from 'react'
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";

function Status() {

    const [id, setId] = useState(0)
    const { contract } = useContract(process.env.NEXT_PUBLIC_SMART_CONTRACT);
    const { data: complaints } = useContractRead(contract, "complaints")
    
    return (
        <div className='status-container'>
            <div className='status'>
                <p className='status-title'>Check Status of Complaint:</p>
                <div className='flex items-center justify-center'>
                    <p className='status-text'>Complaint Id:</p>
                    <input type="number" className='status-input md:w-[300px]' placeholder='Enter Complaint Id' onChange={(e) => setId(e.target.value)} />
                </div>
            </div>
            {complaints && complaints.tilte && (
                <div className='status-render-container md:w-[600px]'>
                    <p className='status-render-title'> Complaint Details:</p>
                    <p className='status-render-text'> Complaint Id: {(complaints.id).toString()}</p>
                    <p className='status-render-text'> Complaint By: {(complaints.complaintRegisteredBy).toString()}</p>
                    <p className='status-render-text'> Complaint Title:{complaints.title}</p>
                    <p className='status-render-text'> Approval Status:{complaints.isApproved ? "Approved" : !complaints.exists ? "Declined" : "Approval Pending"}</p>
                    <p className='status-render-text'> Approval Remark:{complaints.approvalRemark}</p>
                    <p className='status-render-text'> Resolution Status:{complaints.isResolved ? "Resolved" : "Resolution Pending"}</p>
                    <p className='status-render-text mb-2'> Resolution Remark:{complaints.resolutionRemark}</p>

                </div>)}
        </div>
    )
}

export default Status