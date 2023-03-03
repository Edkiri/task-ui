import { useContext } from 'react';
import { List } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentIcon from '@mui/icons-material/Assignment';

import MenuItem from './MenuItem';
import BackgroundLayout from '../../background-layout/BackgroundLayout';
import { MenuContext } from '../context/MenuContext';
import { findAll } from '../../../list/services/list';
import { useQuery } from '@tanstack/react-query';
import { IList } from '../../../list/types/list';
import CreateListForm from '../../../list/components/CreateListForm';

function MenuList() {
  const { closeMenu } = useContext(MenuContext);
  const { data } = useQuery({
    queryKey: ['findAllLists'],
    queryFn: findAll,
  });
  const createdLists = data?.filter(
    (item) => item.slugName !== 'my-day',
  ) as IList[];

  return (
    <>
      <nav className="MenuList">
        <List sx={{ zIndex: 1, mt: 1 }}>
          {data && (
            <>
              <MenuItem iconEl={<WbSunnyIcon />} title={'My Day'} url="/" />
              <MenuItem
                iconEl={<GradeIcon />}
                title={'Important'}
                url="/important"
              />
              <MenuItem
                iconEl={<AssignmentIcon />}
                title={'Tasks'}
                url="/tasks"
              />
              
              <div className="DividerContainer">
                <hr />
              </div>
              {createdLists?.map((list) => {
                return (
                  <MenuItem
                    key={list?.id}
                    title={list.title}
                    url={`/list/${list.slugName}`}
                    iconEl={<FormatListBulletedIcon />}
                  />
                );
              })}
              <CreateListForm />
            </>
          )}
        </List>
      </nav>
      <BackgroundLayout handleClick={closeMenu} />
    </>
  );
}

export default MenuList;
