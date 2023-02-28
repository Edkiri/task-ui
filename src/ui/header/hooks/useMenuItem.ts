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

  if (title === 'Important')
    return {
      quantity: data?.filter((item) => item.important && !item.done).length,
    };

  let quantity = data?.filter(
    (item) => item.list.title === title && !item.done,
  ).length;

  return { quantity };
};

export default useMenuItem;
