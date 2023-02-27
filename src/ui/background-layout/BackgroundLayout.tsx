import { MouseEvent } from 'react';

import './BackgroundLayout.css';

interface props {
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

function BackgroundLayout({ handleClick }: props) {
  return (
    <div className="BackgroundLayout">
      <button onClick={handleClick}></button>
    </div>
  );
}

export default BackgroundLayout;
