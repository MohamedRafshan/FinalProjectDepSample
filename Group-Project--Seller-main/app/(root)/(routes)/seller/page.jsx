'use client'

import { useEffect } from 'react';

import {useStoreModal} from "@/hooks/useStoreModal";



export default function SetupPage() {

  //THIS useStoreModal CAN WE USE LIKE THIS BUT WHEN IT USE INSIDE THE USEEFFECT IT WILL NOT WORKS.
  //const usestoremodal =useStoreModal();

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);


  useEffect(() => {
    if(!isOpen){
      onOpen();
    }             
  }, [onOpen,isOpen]);


  return null;
}