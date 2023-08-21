import './App.css';
import { RouteLinks } from './RouteLinks';
import { UserContext } from './stateManagement/UserContext';
import { useReducer } from 'react';
import {FavUserContext} from './stateManagement/FavUserContext'
import { SearchTextContext } from './stateManagement/SearchTextContext';

function App() {
  
  const [users,userDispatch] = useReducer(userReducer,[])
  const [favUsers,favUserDispatch] = useReducer(favUserReducer,[])
  const [searchText,searchTextDispatch] = useReducer(searchTextReducer,[])

  function userReducer(state,action){
    switch(action.type){
      case 'UPDATE_LIST':
        return action.payload
      case 'CREATE_LIST':
        return [...state,...action.payload]
      default :
        throw new Error('Unexpected action type');
    }
  }

  function favUserReducer(state,action){
    switch(action.type){
      case 'ADD_FAV':
        return [...state,action.payload]
      case 'REMOVE_FAV':
        return action.payload
      default :
        throw new Error('Unexpected action type');
    }
  }

  function searchTextReducer(state,action){
      if(action.type === 'ADD_SEARCH'){
        return action.payload
      }
  }

  return (
    <UserContext.Provider value={{users,userDispatch}}>
      <FavUserContext.Provider value={{favUsers,favUserDispatch}}>
        <SearchTextContext.Provider value={{searchText,searchTextDispatch}}>
          <RouteLinks/>
        </SearchTextContext.Provider>
      </FavUserContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
