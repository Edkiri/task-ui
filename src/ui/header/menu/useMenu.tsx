import { useState } from 'react';
import { MenuOptions } from './components/MenuList';

function useMenu() {
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

  return {
    isOpen,
    toggleMenu,
    selectOption,
    menuOptionSelected: optionSelected,
  };
}

export default useMenu;
