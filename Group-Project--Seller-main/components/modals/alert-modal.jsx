'use client'

import React, { useEffect, useState } from 'react'
import Modal from '../ui/modal';
import { Button } from '../ui/button';


const AlertModal = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    description
}) => {

    const [mounted, setMounted] = useState(false);


    useEffect(()=>{
        setMounted(true);
    },[])


    if(!mounted) return null;

    return ( 
        <Modal
            title="Are you Sure?"
            description={description}
            isOpen={isOpen}
            onClose={onClose}
        
        >
            <div className='pt-5 space-x-2 flex items-center justify-end w-full'>
                <Button
                    disabled={loading}
                    variant='outline'
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant='destructive'
                    onClick={onConfirm}
                >
                    Confirm
                </Button>

            </div>
        </Modal>
     );
}
 
export default AlertModal;