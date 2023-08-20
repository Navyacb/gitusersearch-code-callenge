import {List,ListItem,ListItemText,ListItemAvatar,Avatar,Divider,ListItemButton,IconButton} from '@mui/material';
import {StarOutline}  from '@mui/icons-material';
import { useContext } from 'react';
import { UserContext } from '../stateManagement/UserContext';
import { FavUserContext } from '../stateManagement/FavUserContext';
import { Link } from 'react-router-dom';
import { addRemoveFavUtility } from '../helper/addRemoveFavUtility';

export const ListUsers = (props)=>{
    const {items} = props
    const {users,userDispatch} = useContext(UserContext)
    const {favUsers,favUserDispatch} = useContext(FavUserContext)
    
    console.log('items',items)
    function handleFav(id){
        const result = users.map(user=>{
            if(user.id === id){
                const color = (user.starColor === 'inherit') ? ('yellow') : ('inherit')
                toggleFavorite({...user,...{starColor : color}})
                return {...user,...{starColor : color}}
            }else{
                return {...user}
            }
        })
        userDispatch({type:'UPDATE_LIST',payload : result})
    }

    const toggleFavorite = (user) => {
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

    return (
            <List sx={{margin:'15px'}}>
                {
                    items.map(item=>{
                        return (
                                <>
                                    <ListItem key={item.id}
                                        secondaryAction={
                                            <IconButton type="button" onClick={()=>{addRemoveFavUtility(item.id,users,userDispatch,favUsers,favUserDispatch)}} sx={{ p: '10px'}} aria-label="search">
                                                <StarOutline style={{ color: item.starColor }}  />
                                            </IconButton>
                                        }
                                    >
                                    <Link to = {`/userDetails/${item.id}`}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar alt='userPicture' src={item.avatar_url}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`@${item.login}`}
                                                secondary ={item.bio}
                                            />
                                        </ListItemButton>
                                    </Link>
                                    </ListItem>
                                    <Divider />
                                </>
                        )
                    })  
                }
        </List>
    )
}