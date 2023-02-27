import { useQuery } from '@tanstack/react-query';
import { findAll } from '../../../todos/services/api';
import { MenuOptions } from '../components/MenuList';

interface props {
  title: MenuOptions;
}

const useMenuQuantity = ({ title }: props) => {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });

  let quantity: string | number = '';

  if (title === MenuOptions.MYDAY) {
    quantity = data?.filter((item) => !item.done).length || '';
  }
  if (title === MenuOptions.IMPORTANT) {
    quantity =
      data?.filter((item) => !item.done && item.important).length || '';
  }

  return { quantity };
};

export default useMenuQuantity;
