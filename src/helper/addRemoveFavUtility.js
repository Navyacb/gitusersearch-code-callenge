
export const addRemoveFavUtility = (id,users,userDispatch,favUsers,favUserDispatch)=>{

        const result = users.map(user=>{
            if(user.id === id){
                const color = (user.starColor === 'inherit') ? ('yellow') : ('inherit')
                toggleFavorite({...user,...{starColor : color}},favUsers,favUserDispatch)
                return {...user,...{starColor : color}}
            }else{
                return {...user}
            }
        })
        userDispatch({type:'UPDATE_LIST',payload : result})  

}

const toggleFavorite = (user,favUsers,favUserDispatch) => {
    const result = favUsers.find(fav=>{
        return fav.id===user.id
    })
    if(result){
        const result = favUsers.filter(fav => fav.id !== user.id)
        favUserDispatch({type:'REMOVE_FAV',payload:result});
    }else {
      favUserDispatch({type:'ADD_FAV',payload:user});
    }
  }   