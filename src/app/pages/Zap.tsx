import Item from "@/components/Item"
import axios from "axios";
import { useEffect, useState } from 'react'

interface ZapItem {
  listings: Listings[];
  totalCount: number;
}

interface Listings {
  id: string;
  price: string
  usableAreas: string[];
  photos: string[];
  index: number
}

interface MagesticItem {
  id: string;
  price: number;
  area: number;
  category: number
}

interface ZapResponse {
  data: ZapItem;
}

interface PageItem {
  bairro: string;
  zap: number;
  loft: number;
}

interface PageResponse {
  data: PageItem | null;
}

export default function Loft({ bairro, isFocus }: { bairro: string | null; isFocus: boolean }) {
  const [dadosZap, setDadosZap] = useState<Listings[] | null>(null);
  const [categorized, setCategorized] = useState<number>(0)
  const [bairroCategorizado, setBairroCategorizado] = useState<Listings[] | null>(null)
  const [itemReturn, setItemReturn] = useState<Listings | null>(null)
  const [backClicked, setBackClicked] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [page, setPage] = useState<number>(1)

  const getPage =async () => {
    try {
      const response: PageResponse = await axios.get(`/api/magestic/page/get/${bairro}`)
      response.data ? response.data.zap > 0 ? setPage(response.data.zap) : setPage(1) : updatePage(1)
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }

  const updatePage = async (page: number | null) => {
    const data = {bairro: bairro, zap: page}
    
    
    try {
      const response = await axios.post(`/api/magestic/page/update/zap`, data)
      setPage(response.data.zap)
    } catch (error) {
      console.log('Error update page: ', error)
    }
  }
  
  const getData = async () => {
    setCategorized(0)
    try {
      const response: ZapResponse = await axios.get(`/api/zap-search/${bairro}/${page}`);
      var list = response.data.listings
      setTotalItems(response.data.totalCount)
      if(bairroCategorizado && bairroCategorizado.length > 0) {
        list = list.filter(item => {
          return  !bairroCategorizado.some(item2 => item2.id == item.id)
        })
      }
      setDadosZap(list);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getTable = async () => {
    try {
      const response = await axios.get(`/api/magestic/search/zap/${bairro}`);
      
      const data = response.data.properties;
      setBairroCategorizado(data)
      
    } catch (error) {
        console.error(error);
        // Return a basic 500 Internal Server Error response
        return new Response("Internal Server Error", { status: 500 });
    }
  }

  const addCategorized = async (data: Listings | MagesticItem, category: number) => {
    data = {...data, category: category}
    
    try {
      const response = await axios.post(`/api/magestic/add/zap/${bairro}`, data)
      setItemReturn(response.data.property)
    } catch (error) {
      console.log('Error post data: ', error)
    }
  }

  const updateCategorized = async (id: string, category: number) => {
    const data = {id: id, category: category}
    
    try {
      const response = await axios.put(`/api/magestic/update/zap/${bairro}`, data)
      setItemReturn(response.data.newProperty)
      
    } catch (error) {
      console.log('Error post data: ', error)
    }
  }
  
  useEffect(() => {
      bairro && getPage()
      bairro && getTable()
  }, [bairro])

  useEffect(() => {
      bairro && getTable()
  }, [page])

  useEffect(() => {    
    bairro && getData()
  }, [bairroCategorizado])
  useEffect(() => {
      setBackClicked(backClicked)
  }, [backClicked])
  useEffect(() => {
    setItemReturn(itemReturn)
  }, [itemReturn])
  return (
      <>
          <h1 className='text-xl underline decoration-yellow-1'>{bairroCategorizado && bairroCategorizado?.length + categorized}/{totalItems} Categorizados</h1>
          <div className='flex flex-row gap-9 items-center'>
              <Item
                  category={null}
                  dados={dadosZap && !backClicked ? { id: dadosZap[0].id, price: Number(dadosZap[0].price), area: Number(dadosZap[0].usableAreas[0]) } : backClicked && itemReturn ? { id: itemReturn.id, price: Number(itemReturn.price), area: Number(itemReturn.usableAreas[0]) } : { id: null, price: null, area: null }}
                  mini={false}
                  isFree={!isFocus}
                  back={itemReturn !== null && !backClicked}
                  onCategorize={(category) => {
                      if (!backClicked) {
                          var data: Listings[] = []
                          dadosZap !== null ? data = [...dadosZap] : null
                          data.shift()
                          setDadosZap(data)
                          setCategorized(categorized + 1)                          
                      }
                      dadosZap && !backClicked ? addCategorized(dadosZap[0], category) : null
                      backClicked && itemReturn ? updateCategorized(itemReturn.id, category) : null
                      dadosZap && dadosZap[0].index === 108 ? updatePage(page + 1) : null
                      
                      setBackClicked(false)
                      setItemReturn(null)
                  }}
                  onBack={() => {
                      setBackClicked(true)
                  }
                  }
                  zap={true}
                  zapPhotos={dadosZap && !backClicked ? dadosZap[0].photos : backClicked && itemReturn ? itemReturn.photos : []}
              />
          </div>
      </>
  )
}