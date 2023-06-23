import React, { ChangeEvent, useState} from 'react';
import { FilterValueType } from '../../App';
import AddItemForm from '../AddItemForm';
import { ReturnInput } from './ReturnImput';


export type FilmType = {
  id: string;
  title: string;
  isDone: boolean;
};

type Genre = {
  id: string;
  title: string;
  film: Array<FilmType>;
  removeFilm: (id: string, filmlistId: string) => void;
  changeFilter: (value: FilterValueType, filmlistId: string) => void;
  addFilm: (title: string, filmlistId: string) => void;
  changeFilmStatus: (filmID: string, isDone: boolean, filmlistId: string) => void;
  changeFilmTitle: (id: string, newTitle: string, filmlistId: string) => void;
  filter: FilterValueType;
  removeFilmList:(filmlistId: string)=> void;
  changeTitleFilmList: (filmlistId: string, newTitle: string,)=> void;
};


export function Note (props: Genre) {
  const onAllClickHandler = () => props.changeFilter("all", props.id );
  const onCompleatedClickHandler = () => props.changeFilter("completed", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const removeFilmList = () =>{
    props.removeFilmList(props.id)
  }
  const changeTitleFilmList = (newTitle: string) =>{
    props.changeTitleFilmList(props.id, newTitle)
  } 
  const addFilm= (title: string) => {
    props.addFilm(title, props.id);
}
    return (
      <div>
        <h3> <ReturnInput title={props.title} onChange={changeTitleFilmList}/><button onClick={removeFilmList}>x</button></h3>
        <AddItemForm addItem={addFilm}/>
        <ul>
          {props.film.map(f=> {
            const onClickHandler = () =>props.removeFilm(f.id, props.id)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeFilmStatus(f.id, e.currentTarget.checked,  props.id);
            };
            const onChangeFilmHandler = (newValue: string) => {
              props.changeFilmTitle(f.id, newValue,  props.id);
            };
            return(<li className={f.isDone ? 'done' : ""} key={f.id}>
              <input type="checkbox" 
                    onChange={onChangeStatusHandler}
                    />
                   <ReturnInput title ={f.title} 
                      onChange={onChangeFilmHandler}/>
              <button onClick={onClickHandler} > x </button>
             </li>
          )}
           )}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter': ""} 
            onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'completed' ?'active-filter': ''}
            onClick={onCompleatedClickHandler}>Completed</button>
            <button className={props.filter === 'active' ?'active-filter': ''}
            onClick={onActiveClickHandler}>Active</button>
        </div>
      </div>
    );
    
}
export default Note;
