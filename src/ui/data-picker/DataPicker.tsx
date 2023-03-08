import { useState } from 'react';

interface props {
  onSave: (date: Date) => void;
}

export default function DatePicker({ onSave }: props) {
  const [expirationDate, setExpirationDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [dateHasChanged, setDateHasChanged] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpirationDate(e.target.value);
    setDateHasChanged(true);
  };

  const handleSave = () => {
    onSave(new Date(expirationDate));
  };

  return (
    <div className="DataPickerContiner">
      <input type="date" value={expirationDate} onChange={handleChange} />
      {dateHasChanged && (
        <button
          disabled={!dateHasChanged}
          className="SaveButton"
          onClick={handleSave}
        >
          Save
        </button>
      )}
    </div>
  );
}
