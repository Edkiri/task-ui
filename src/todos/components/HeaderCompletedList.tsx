import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface props {
  completedIsOpen: boolean;
  toggleCompletedList: () => void;
}

function HeaderCompletedList({ toggleCompletedList, completedIsOpen }: props) {
  return (
    <button className="HeaderCompletedContainer" onClick={toggleCompletedList}>
      <ArrowForwardIosIcon
        className={'ArrowIcon ' + `${completedIsOpen ? 'open' : ''}`}
      />
      <span>Completed</span>
    </button>
  );
}

export default HeaderCompletedList;
