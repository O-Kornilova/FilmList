import React, { ChangeEvent,  useState } from 'react';

type AddItemFormProps = {
addItem: (title: string)=> void
}

function AddItemForm (props: AddItemFormProps)  {
  let [newFilmtitle, setNewFilmtitle] = useState("");
  let [error, setError] = useState <string | null> (null);
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFilmtitle(e.currentTarget.value)
}
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      setError(null);
      if (e.key === "Enter") {
        props.addItem(newFilmtitle);
        setNewFilmtitle("");
      } 
    };
  const addFilm = () => {
      if (newFilmtitle.trim() !== "") {
        props.addItem(newFilmtitle.trim());
        setNewFilmtitle("");
      } else {
        setError('Field is required');
      }
    };

  return <div>
  <input value={newFilmtitle} 
        onChange={onChangeHandler}
        onKeyDown =  {onKeyDownHandler}
        className={error ? 'error' : ''}
        />
  <button onClick= {addFilm}>+</button>
  {error && <div className='error-message'>{error}</div>}
</div>
}
export default AddItemForm;