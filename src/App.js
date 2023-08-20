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
    if(action.type === 'CREATE_LIST' || action.type==='UPDATE_LIST'){
        return action.payload
    }else{
      return state
    }
  }

  function favUserReducer(state,action){
    if(action.type === 'ADD_FAV'){
      return [...state,action.payload]
    }else if(action.type === 'REMOVE_FAV'){
      return action.payload
    }else{
      return state
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
