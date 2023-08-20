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