import { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { XIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';

interface MenuProps {
  onChangePage: (e: string) => void
}

const MenuHamburger: React.FC<MenuProps> = ({ onChangePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState('Loft')


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    onChangePage(page)
  }, [page])

  return (
    <>
      <button
        className="z-50 rounded-md text-golden-1"
        onClick={toggleMenu}
      >
        {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      <Transition in={isOpen} timeout={500} unmountOnExit>
        {(state: string) => (
          <>
            <div
              className={`flex flex-col gap-10 justify-center items-start fixed z-40 left-0 top-1/2 -translate-y-1/2 rounded-r-xl h-3/4 md:w-80 max-md:h-full  max-md:w-full bg-gray-900 bg-blur text-white p-4 transform transition-transform  ease-in-out ${state === 'entered' ? 'translate-x-0' : '-translate-x-full'
                }`}
            >


              {page === 'Loft' ? (
                <button onClick={() => {
                  setPage('Loft')
                }} className='text-2xl px-6 border-l border-l-golden-1 transition-[0.5s]' >Loft</button>
              ) : (
                <button onClick={() => {
                  setPage('Loft')
                  setIsOpen(false)
                }} className='text-xl px-6 hover:border-l hover:border-l-golden-1 hover:text-2xl transition-[0.5s]' >Loft</button>
              )}

              {page === 'Zap' ? (
                <button onClick={() => {
                  setPage('Zap')
                }} className='text-2xl px-6 border-l border-l-golden-1 transition-[0.5s]' >Zap</button>
              ) : (
                <button onClick={() => {
                  setPage('Zap')
                  setIsOpen(false)
                }} className='text-xl px-6 hover:border-l hover:border-l-golden-1 hover:text-2xl transition-[0.5s]' >Zap</button>
              )}

              {page === 'gallery' ? (
                <button onClick={() => {
                  setPage('gallery')
                }} className='text-2xl px-6 border-l border-l-golden-1 transition-[0.5s]' >Galeria</button>
              ) : (
                <button onClick={() => {
                  setPage('gallery')
                  setIsOpen(false)
                }} className='text-xl px-6 hover:border-l hover:border-l-golden-1 hover:text-2xl transition-[0.5]' >Galeria</button>
              )}

            </div>
            <button
              className={`absolute z-30 w-full h-full inset-0 ${isOpen ? 'backdrop-blur-sm bg-black bg-opacity-50' : ''}`}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </Transition>
    </>
  );
};

export default MenuHamburger;
