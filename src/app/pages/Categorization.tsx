import Item from "@/components/Item"
import axios from "axios";
import { useEffect, useState } from 'react'

interface LoftItem {
    id: string;
    price: number;
    area: number;
  }
  
  interface MagesticItem {
    id: string;
    price: number;
    area: number;
    category: number
  }
  
  interface LoftResponse {
    data: LoftItem[];
  }

export default function Categorization({ bairro, isFocus }: { bairro: string | null; isFocus: boolean }) {
    const [dadosLoft, setDadosLoft] = useState<LoftItem[] | null>(null);
    const [categorized, setCategorized] = useState<number>(0)
    const [bairroCategorizado, setBairroCategorizado] = useState<LoftItem[] | null>(null)
    const [itemReturn, setItemReturn] = useState<LoftItem | null>(null)
    const [backClicked, setBackClicked] = useState<boolean>(false)
    const [totalItems, setTotalItems] = useState<number>(0)
    
    const getData = async () => {
      setCategorized(0)
      try {
        const response: LoftResponse = await axios.get(`/api/search/${bairro}`);
        var list = response.data
        setTotalItems(response.data.length)
        if(bairroCategorizado && bairroCategorizado.length > 0) {
          list = list.filter(item => {
            return  !bairroCategorizado.some(item2 => item2.id == item.id)
          })
        }
        setDadosLoft(list);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const getTable = async () => {
      try {
        const response = await axios.get(`/api/magestic/search/${bairro}`);
        const data = response.data.properties;
        setBairroCategorizado(data)
        
      } catch (error) {
          console.error(error);
          // Return a basic 500 Internal Server Error response
          return new Response("Internal Server Error", { status: 500 });
      }
    }
  
    const addCategorized = async (data: LoftItem | MagesticItem, category: number) => {
      data = {...data, category: category}
      
      try {
        const response = await axios.post(`/api/magestic/add/${bairro}`, data)
        setItemReturn(response.data)
      } catch (error) {
        console.log('Error post data: ', error)
      }
    }
  
    const updateCategorized = async (id: string, category: number) => {
      const data = {id: id, category: category}
      
      try {
        const response = await axios.put(`/api/magestic/update/${bairro}`, data)
        setItemReturn(response.data)
      } catch (error) {
        console.log('Error post data: ', error)
      }
    }
    
    useEffect(() => {
      if (bairro) {
        getTable()
      }
    }, [bairro])
  
    useEffect(() => {
      getData()
    }, [bairroCategorizado])
    useEffect(() => {
        console.log()
    }, [backClicked])
    return (
        <>
            <h1 className='text-xl underline decoration-yellow-1'>{bairroCategorizado && bairroCategorizado?.length + categorized}/{totalItems} Categorizados</h1>
            <div className='flex flex-row gap-9 items-center'>
                <Item
                    category={null}
                    dados={dadosLoft && !backClicked ? dadosLoft[0] : backClicked && itemReturn ? itemReturn : { id: null, price: null, area: null }}
                    mini={false}
                    isFree={!isFocus}
                    back={itemReturn !== null && !backClicked}
                    onCategorize={(category) => {
                        if (!backClicked) {
                            var data: LoftItem[] = []
                            dadosLoft !== null ? data = [...dadosLoft] : null
                            data.shift()
                            setDadosLoft(data)
                            setCategorized(categorized + 1)
                        }

                        dadosLoft && !backClicked ? addCategorized(backClicked && itemReturn ? itemReturn : dadosLoft[0], category) : null
                        backClicked && itemReturn ? updateCategorized(itemReturn.id, category) : null

                        setBackClicked(false)
                        setItemReturn(null)
                    }}
                    onBack={() => {
                        setBackClicked(true)
                    }
                    }
                />
            </div>
        </>
    )
}