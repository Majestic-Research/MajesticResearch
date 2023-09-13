'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Item from '@/components/Item'
import Header from '@/components/Header';
import { api } from '@/lib/api';
import Categorization from './pages/Categorization';
import Gallery from './pages/Gallery';





export default function Home() {
  const [bairro, setBairro] = useState<string|null>()
  const [isFocus, setIsfocus] = useState<boolean>(false)
  const [page, setPage] = useState('categorization')

  return (
    <div className='w-full h-full bg-black'>
      <div className='h-full w-full flex flex-col items-center justify-start p-6 gap-7'>

        <Header 
          onEnterPressed={(e) => {
            setBairro(e)
          }}
          onFocus={(e) =>{
            setIsfocus(e)
          }}
          onChangePage={(e) => setPage(e)}
        />
        {page === 'categorization' && (<Categorization bairro={bairro || null} isFocus={isFocus} />)}
        {page === 'gallery' && (<Gallery bairro={bairro || null} />)}
      </div>
    </div>
  );
}
