'use-client'
import Image from 'next/image'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import PhotoCarousel from '@/components/PhotoCarousel'
import { Undo2 } from 'lucide-react'

interface ItemProps {
    dados: {
        id: string | null;
        price: number | null;
        area: number | null;
        // Outras propriedades aqui
    };
    category: number | null
    mini: boolean;
    onCategorize: (category: number) => void;
    onBack: () => void;
    back: boolean;
    isFree: boolean
}

interface Images {
    data: string[]
}

const Item: React.FC<ItemProps> = ({ dados, mini, onCategorize, onBack, back, isFree, category }) => {
    const [confirm, setConfirm] = useState<boolean>(false)
    const [selectValue, setSelectValue] = useState<string>('null')
    const [img, setImg] = useState<string[]>(['https://i.seadn.io/gae/CyjD_1yJ_1LocRGzcPqqea7IQPgQzD7ywpsSd132aQQMtkXXLdM6ViX62jIrMMqiI3Y9iJbBT0AJdiqWkAjV1AAqi7vI2zrBokryKMk?auto=format&dpr=1&w=1000'])
    const confirmButton = useRef<HTMLButtonElement | null>(null)

    const images = async () => {
        if (dados.id !== null) {
            try {
                const response: Images = await axios.get(`/api/images/${dados.id}`);
                setImg(response.data)


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    useEffect(() => {
        category === 1  && setSelectValue('Alto')
        category === 2  && setSelectValue('Medio')
        category === 3  && setSelectValue('Baixo')
    }, [category])

    useEffect(() => {
        images()
        if (isFree) {
            const teclaPressionada = (event: KeyboardEvent) => {
              // Verifica se a tecla pressionada é a que você deseja (por exemplo, a tecla 'm')
              if (event.key === 'a') {
                setSelectValue('Alto');
                setConfirm(true)
              }
              if (event.key === 's') {
                setSelectValue('Medio');
                setConfirm(true)
              }
              if (event.key === 'd') {
                setSelectValue('Baixo');
                setConfirm(true)
              }
    
              if (event.key === 'Enter') {
               confirmButton.current ? confirmButton.current.click() : null
              }
            };
    
        
            // Adiciona um ouvinte de evento para a tecla pressionada
            window.addEventListener('keydown', teclaPressionada);
        
            // Remove o ouvinte de evento quando o componente for desmontado
            return () => {
              window.removeEventListener('keydown', teclaPressionada);
            };
        }
    }, [isFree, dados.id]);

    return (
        <div className='flex flex-col items-center gap-3 p-7 max-sm:gap-[30px] bg-gray-800 rounded-md'>
            <PhotoCarousel images={img} mini={mini} />
            <div className='w-full flex flex-row justify-between'>
                {!mini && back ? (
                    <div className='w-full flex min-[1141px]:hidden'>
                        <button 
                            onClick={onBack}
                            className='p-1 border-2 text-red-500 border-red-500 rounded-xl active:bg-red-500 active:text-white'
                        >
                            <Undo2 />
                        </button>
                    </div>
                ): null}
                <div className='flex w-full justify-center flex-row gap-0 min-[1358px]:hidden'>
                    {selectValue !== 'Alto' ? (
                        <button
                            onClick={() => {
                                setConfirm(true)
                                setSelectValue('Alto')
                            }}
                            className='px-4 py-1 border border-golden-1 hover:bg-golden-1 hover:text-white text-golden-1 rounded-l-full'
                        >
                            Alto
                        </button>) : (<button
                            onClick={() => {
                                setConfirm(false)
                                setSelectValue('null')
                            }}
                            className='px-4 py-1 border border-golden-1 hover:bg-golden-1 hover:text-white text-white bg-golden-1 rounded-l-full'
                        >
                            Alto
                        </button>
                    )}
                    {selectValue !== 'Medio' ? (
                        <button
                            onClick={() => {
                                setConfirm(true)
                                setSelectValue('Medio')
                            }}
                            className='px-4 py-1 border border-golden-1 hover:bg-golden-1 hover:text-white text-golden-1'
                        >
                            Medio
                        </button>) : (<button
                            onClick={() => {
                                setConfirm(false)
                                setSelectValue('null')
                            }}
                            className='px-4 py-1 border border-golden-1 hover:bg-golden-1 hover:text-white text-white bg-golden-1'
                        >
                            Medio
                        </button>
                    )}
                    {selectValue !== 'Baixo' ? (
                        <button
                            onClick={() => {
                                setConfirm(true)
                                setSelectValue('Baixo')
                            }}
                            className='px-4 py-1 border border-golden-1 hover:bg-golden-1 hover:text-white text-golden-1 rounded-r-full'
                        >
                            Baixo
                        </button>) : (<button
                            onClick={() => {
                                setConfirm(false)
                                setSelectValue('null')
                            }}
                            className='px-4 py-1 border border-golden-1 hover:bg-golden-1 hover:text-white text-white bg-golden-1 rounded-r-full'
                        >
                            Baixo
                        </button>
                    )}
                </div>
            </div>
            <div className='flex w-full flex-row items-start justify-between '>
                <div className='flex flex-row gap-2'>
                    {!mini && back ? (
                        <button className='left-52 p-1 border-2 text-red-500 border-red-500 rounded-xl max-[1141px]:hidden hover:text-white hover:bg-red-500'>
                            <Undo2 />
                        </button>  
                    ): null}
                    <div>
                        <h1 className='text-2xl'>R$ {dados.price && dados.price.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</h1>
                        <h2 className='text-xl font-alt'>R$ {dados.price && dados.area ? Math.round(dados.price / dados.area).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : null}/m² | {dados.area} m²</h2>
                    </div>
                </div>
                <div className='flex flex-row gap-0 max-[1358px]:hidden'>
                    {selectValue !== 'Alto' ? (
                        <button
                            onClick={() => {
                                setConfirm(true)
                                setSelectValue('Alto')
                            }}
                            className='p-2 border border-golden-1 hover:bg-golden-1 hover:text-white text-golden-1 rounded-l-full'
                        >
                            Alto
                        </button>) : (<button
                            onClick={() => {
                                setConfirm(false)
                                setSelectValue('null')
                            }}
                            className='p-2 border border-golden-1 hover:bg-golden-1 hover:text-white text-white bg-golden-1 rounded-l-full'
                        >
                            Alto
                        </button>
                    )}
                    {selectValue !== 'Medio' ? (
                        <button
                            onClick={() => {
                                setConfirm(true)
                                setSelectValue('Medio')
                            }}
                            className='p-2 border border-golden-1 hover:bg-golden-1 hover:text-white text-golden-1'
                        >
                            Medio
                        </button>) : (<button
                            onClick={() => {
                                setConfirm(false)
                                setSelectValue('null')
                            }}
                            className='p-2 border border-golden-1 hover:bg-golden-1 hover:text-white text-white bg-golden-1'
                        >
                            Medio
                        </button>
                    )}
                    {selectValue !== 'Baixo' ? (
                        <button
                            onClick={() => {
                                setConfirm(true)
                                setSelectValue('Baixo')
                            }}
                            className='p-2 border border-golden-1 hover:bg-golden-1 hover:text-white text-golden-1 rounded-r-full'
                        >
                            Baixo
                        </button>) : (<button
                            onClick={() => {
                                setConfirm(false)
                                setSelectValue('null')
                            }}
                            className='p-2 border border-golden-1 hover:bg-golden-1 hover:text-white text-white bg-golden-1 rounded-r-full'
                        >
                            Baixo
                        </button>
                    )}
                </div>
            </div>
            {confirm && (
                <button
                    className='w-full text-golden-1 border border-golden-1 hover:bg-golden-1 hover:text-white rounded-full p-2 active:bg-golden-1 active:text-white'
                    ref={confirmButton}
                    onClick={() => {
                        var catecory: number = 0
                        selectValue === 'Alto' ? catecory = 1 : null
                        selectValue === 'Medio' ? catecory = 2 : null
                        selectValue === 'Baixo' ? catecory = 3 : null
                        onCategorize(catecory)
                        setSelectValue('null')
                        setConfirm(false)
                    }}
                >Confirm</button>
            )}
        </div>
    )
}

export default Item
