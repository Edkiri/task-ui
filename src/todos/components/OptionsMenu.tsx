
import "../styles/OptionsMenu.css";

interface props {
  x: number;
  y: number;
  closeMenu: () => void;
}

export default function OptionsMenu({ x, y, closeMenu }: props) {
  return (
    <ul className='OptionsMenu' style={{ position: 'absolute', top: `${y}px`, left: `${x}px` }}>
      <li>
        <button>Add to My day</button>
      </li>
    </ul>
  );
}
