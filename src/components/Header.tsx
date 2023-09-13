import { Menu, Search } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";

interface ItemProps {
  onEnterPressed: (e: string | undefined) => void;
  onFocus: (e: boolean) => void;
  onChangePage: (e: string) => void
}

const Header: React.FC<ItemProps> = ({ onEnterPressed, onFocus, onChangePage }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocus, setIsFocus] = useState(false)
  const [page, setPage] = useState('categorization')

  useEffect(() => {
    onChangePage(page)
  }, [page])

  return (
    <div className='w-full flex flex-row justify-between '>
    <HamburgerMenu onChangePage={(e) => {
      setPage(e)
      onChangePage(page)
    }} />
    <div className='flex w-96 flex-row border-b max-sm:w-52'>
      <Search className='stroke-1' />
      <input 
        type="text" 
        placeholder='Buscar bairro' 
        className='flex w-full items-center px-2 bg-transparent font-alt outline-none'
        ref={inputRef}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onEnterPressed(inputRef.current?.value);
            inputRef.current?.blur();
          } 
        }}
        onFocus={() => {
          onFocus(true)
          // console.log(true);
        }}
        onBlur={() => {
          onFocus(false)
          // console.log(false);
        }}
      />
    </div>
      <img src="./icon.png" className='w-6 h-6' alt="" />
    </div>
  );
};

export default Header;
