import { createContext, useState } from 'react';
import { MenuOptions } from '../components/MenuList';

type MenuContextType = {
  isOpen: boolean;
  toggleMenu: () => void;
  optionSelected: MenuOptions;
  selectOption: (option: MenuOptions) => void;
};

export const MenuContext = createContext<MenuContextType>(
  {} as MenuContextType,
);

interface props {
  children: JSX.Element | JSX.Element[];
}

export function MenuProvider({ children }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState<MenuOptions>(
    MenuOptions.MYDAY,
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: MenuOptions) => {
    if (option === optionSelected) return;
    setOptionSelected(option);
    setIsOpen(false);
  };
  return (
    <MenuContext.Provider
      value={{
        isOpen,
        toggleMenu,
        optionSelected,
        selectOption,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
