import {List,ListItem,ListItemText,ListItemAvatar,Avatar,Divider,Paper,ListItemButton,IconButton} from '@mui/material';
import {StarOutline} from '@mui/icons-material';
import { useState } from 'react';

export const SearchList = (props)=>{

    const {users,userDispatch} = props
    function handleFav(id){
        alert('button clicked')
        const result = users.map(user=>{
            if(user.id === id){
                const color = (user.starColor==='inherit') ? ('yellow') : ('inherit')
                return {...user,...{starColor : color}}
            }else{
                return {...user}
            }
        })
        userDispatch({type:'UPDATE_USER',payload : result})
    }

    return (
        <Paper elevation={3}>
        <List sx={{margin:'15px'}}>
            {
                users.map(user=>{
                    return (
                            <>
                                <ListItem
                                    secondaryAction={
                                        <IconButton type="button" onClick={()=>{handleFav(user.id)}} color='inherit' sx={{ p: '10px'}} aria-label="search">
                                            <StarOutline style={{ color: user.starColor }}  />
                                        </IconButton>
                                    }
                                >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar alt='userPicture' src={user.avatar_url}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`@${user.login}`}
                                        // secondary ={(usersBio(user.url) === null) ? 
                                        //     "" :
                                        //     `${usersBio(user.url)}`
                                        // }
                                    />
                                </ListItemButton>
                                </ListItem>
                                <Divider />
                            </ >
                    )
                })
                
            }
        </List>
        </Paper>
    )
}