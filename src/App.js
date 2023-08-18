import './App.css';
import { RouteLinks } from './RouteLinks';
import { UserContext } from './stateManagement/UserContext';
import { useReducer } from 'react';
import {FavUserContext} from './stateManagement/FavUserContext'

function App() {
  const [users,userDispatch] = useReducer(userReducer,[])
  const [favUsers,favUserDispatch] = useReducer(favUserReducer,[])

  function userReducer(state,action){
    if(action.type === 'CREATE_LIST' || action.type==='UPDATE_USER'){
        return action.payload
    }else{
      return state
    }
  }

  function favUserReducer(state,action){
    if(action.type === 'ADD_FAV'){
      alert('1')
      return [...state,action.payload]
    }else if(action.type === 'REMOVE_FAV'){
      alert('2')
      return action.payload
    }else{
      return state
    }
  }

  return (
    <UserContext.Provider value={{users,userDispatch}}>
      <FavUserContext.Provider value={{favUsers,favUserDispatch}}>
        <RouteLinks/>
      </FavUserContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
