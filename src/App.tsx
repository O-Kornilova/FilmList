import React, { useState } from 'react';
import './App.css';
import Note, {FilmType} from './Components/Note/Note';
import Recommend from './Components/Recommend/Recommend';
import { v1 } from 'uuid';
import AddItemForm from './Components/AddItemForm';

export type FilterValueType = "all" | "active" | "completed";
type FilmListType = {
  id: string
  title: string
  filter: FilterValueType
}
type TaskStateType={
  [key: string ]: Array<FilmType>
}

function App() { 

function removeFilm(id:string, filmlistId:string){
  let films = filmObj[filmlistId];
  let filteredFilms = films.filter( f=> f.id !==id);
  filmObj[filmlistId] = filteredFilms;
  setFilm({...filmObj});
}

function addFilm(title: string, filmlistId:string) {
  let newFilm= { 
    id : v1(), 
    title: title, 
    isDone: false
  };
  let films = filmObj[filmlistId];
  let newFilms = [newFilm, ...films];
  filmObj[filmlistId]=newFilms
  setFilm({...filmObj});
}

function changeFilter(value: FilterValueType,filmlistId: string){
  let foundFilmlist = filmlist.find(fl=>fl.id===filmlistId);
  if (foundFilmlist){
    foundFilmlist.filter = value;
    setFilmList([...filmlist]);
  }
}

function changeStatus(filmID: string, isDone: boolean, filmlistId: string){
  let films = filmObj[filmlistId];
  let ifilm = films.find( (f)=>f.id === filmID);
  if (ifilm) {
    ifilm.isDone = isDone;
    setFilm({...filmObj});
  }
}
function changeFilmTitle(filmID: string, newTitle:string, filmlistId: string){
  let films = filmObj[filmlistId];
  let ifilm = films.find( (f)=>f.id === filmID);
  if (ifilm) {
    ifilm.title = newTitle;
    setFilm({...filmObj});
  }
}
let filmlistId1=v1();
let filmlistId2=v1();

let [filmlist, setFilmList] = useState<Array<FilmListType>>  ([
  {id: filmlistId1, title: 'comedy', filter: 'all'},
  {id: filmlistId2, title: 'drama', filter: 'all'},
])

let removeFilmList= (filmlistId: string)=>{
  let filteredFilmList = filmlist.filter(fl =>fl.id!==filmlistId);
  setFilmList(filteredFilmList);
  delete filmObj[filmlistId];
  setFilm({...filmObj});
}
let changeTitleFilmList= (filmlistId: string, newTitle: string)=>{
  const findFilmList = filmlist.find(fl =>fl.id!==filmlistId);
  if (findFilmList){
    findFilmList.title = newTitle
  }
  setFilm({...filmObj});
}

let [filmObj, setFilm] = useState<TaskStateType>({
  [filmlistId1]:[{id: v1(), title: "Мой шпион", isDone: true},
  {id: v1(), title: "Благие знамения", isDone: false},
  {id: v1(), title: "Терапія", isDone: true},
  {id: v1(), title: "Ну разве не романтично?", isDone: false},
  {id: v1(), title: "Монтеджордано", isDone: true}
],
[filmlistId2]:[{id: v1(), title: "Мой ", isDone: true},
{id: v1(), title: " знамения", isDone: false},
]
})

function addFilmList(title: string){
  let addList: FilmListType= {
    id: v1(),
    filter: 'all',
    title: title
  }
  setFilmList([addList, ...filmlist]);
  setFilm({
    ...filmObj,
    [addList.id]: []
  })
}

  return (
      <div className="app mobile-view">
        <header className="App-header">
            <h1>Movie List App</h1>
        </header>
        <div className="main">
        <AddItemForm addItem={addFilmList}/>
        {
          filmlist.map((fl)=>{
            let filmForList = filmObj[fl.id];
            if(fl.filter === "active") {
            filmForList = filmForList.filter( f=> f.isDone === true)
            }
            if(fl.filter === "completed") {
            filmForList = filmForList.filter( f=> f.isDone === false)
            }

            return <Note
            key={fl.id}
            id={fl.id}
            title={fl.title}
            film={filmForList}
            removeFilm = {removeFilm}
            changeFilter={changeFilter}
            addFilm={addFilm}
            changeFilmStatus={changeStatus}
            changeFilmTitle={changeFilmTitle}
            filter={fl.filter}
            removeFilmList={removeFilmList}
            changeTitleFilmList={changeTitleFilmList}
            />
          }
          )
        }
        </div>
        <Recommend/>
      </div>
  );
}

export default App;
