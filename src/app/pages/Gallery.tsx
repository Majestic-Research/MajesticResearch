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
    category: number;
    photos: string[]
  }
  
  interface LoftResponse {
    data: LoftItem[];
  }

export default function Gallery({ bairro }: { bairro: string | null; }) {
    const [bairroCategorizado, setBairroCategorizado] = useState<MagesticItem[] | null>(null)
    const [plataform, setPlataform] = useState<string>("loft")
  
    const getTable = async () => {
      try {
        const response = await axios.get(`/api/magestic/search/${plataform}/${bairro}`);
        const data = response.data.properties;
        setBairroCategorizado(data)
        
      } catch (error) {
          console.error(error);
          // Return a basic 500 Internal Server Error response
          return new Response("Internal Server Error", { status: 500 });
      }
    }
  
    const updateCategorized = async (id: string, category: number) => {
      const data = {id: id, category: category}
      
      try {
        axios.put(`/api/magestic/update/${bairro}`, data)
      } catch (error) {
        console.log('Error post data: ', error)
      }
    }
    
    useEffect(() => {
      bairro && getTable()
    }, [bairro])
    useEffect(() => {
      bairro && getTable()
    }, [plataform])
    return (
        <>
          <div className="flex flex-row gap-14">
            <button 
              onClick={() => setPlataform("loft")} 
              className={`${plataform == "loft" ?"border-b border-b-golden-1" : ""}`}
            >Loft</button>
            <button 
              onClick={() => setPlataform("zap")} 
              className={`${plataform == "zap" ?"border-b border-b-golden-1" : ""}`}
            >Zap</button>
          </div>
            <div className='flex w-full flex-wrap mt-8'>
                {bairroCategorizado && bairroCategorizado?.map((item, index) => {
                    return (
                        <div key={index} className="w-1/3 p-4 max-md:w-1/2 max-sm:w-full">
                            <Item
                                dados={item}
                                mini={true}
                                isFree={false}
                                back={false}
                                onCategorize={(category) => {
                                    updateCategorized(item.id, category)
                                }}
                                category={item.category}
                                onBack={() => {}}
                                zap={plataform === "zap"}
                                zapPhotos={plataform === "zap" ? item.photos : []}
                            />
                        </div>
                    )
                })}
            </div>
        </>
    )
}