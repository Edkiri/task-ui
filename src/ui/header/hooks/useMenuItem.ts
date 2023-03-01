import { useQuery } from '@tanstack/react-query';
import { findAll } from '../../../todos/services/todo';

interface props {
  title: string;
}

const useMenuItem = ({ title }: props) => {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });

  if (title === 'Important') {
    const quantity = data?.filter(
      (item) => item.important && !item.done,
    ).length;
    if (!quantity) return { quantity: '' };
    return { quantity };
  }
  if (title === 'My Day') {
    const quantity = data?.filter((item) => item.today && !item.done).length;
    if (!quantity) return { quantity: '' };
    return { quantity };
  }

  let quantity: string | number | undefined = data?.filter(
    (item) => item.list?.title === title && !item.done,
  ).length;
  if (!quantity) quantity = '';

  return { quantity };
};

export default useMenuItem;
