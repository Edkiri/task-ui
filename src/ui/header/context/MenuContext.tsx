import { createContext, useState } from 'react';

type MenuContextType = {
  isOpen: boolean;
  toggleMenu: () => void;
  menuTitleSelected: string;
  selectMenuTitle: (title: string) => void;
  closeMenu: () => void;
};

export const MenuContext = createContext<MenuContextType>(
  {} as MenuContextType,
);

interface props {
  children: JSX.Element | JSX.Element[];
}

export function MenuProvider({ children }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuTitleSelected, setMenuTitleSelected] = useState<string>('My Day');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const selectMenuTitle = (title: string) => {
    if (title === menuTitleSelected) return;
    setMenuTitleSelected(title);
    setIsOpen(false);
  };
  return (
    <MenuContext.Provider
      value={{
        isOpen,
        toggleMenu,
        menuTitleSelected,
        selectMenuTitle,
        closeMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
