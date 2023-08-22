import {List,ListItem,ListItemText,ListItemAvatar,Avatar,Divider,ListItemButton,IconButton} from '@mui/material';
import {StarOutline}  from '@mui/icons-material';
import { useContext } from 'react';
import { UserContext } from '../stateManagement/UserContext';
import { FavUserContext } from '../stateManagement/FavUserContext';
import { Link } from 'react-router-dom';
import { addRemoveFavUtility } from '../helper/addRemoveFavUtility';
import InfiniteScroll from 'react-infinite-scroll-component';

export const ListUsers = (props)=>{
    // ,hasMore,loadUsers
    const {items,hasMore,loadUsers} = props
    const {users,userDispatch} = useContext(UserContext)
    const {favUsers,favUserDispatch} = useContext(FavUserContext)

    return (
        <InfiniteScroll
            dataLength={items.length}
            next={loadUsers}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more users to display.</p>}
        >
            <List sx={{margin:'15px'}}>
                {
                    items.map((item,index)=>{
                        return (
                                <div key={index}>
                                    <ListItem
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
                                </div>
                        )
                    })  
                }
        </List>
        </InfiniteScroll>
    )
}