import { Card,IconButton,CardMedia,Box,CardContent,Typography } from "@mui/material"
import { StarOutline } from "@mui/icons-material"
import {addRemoveFavUtility} from '../helper/addRemoveFavUtility'
import { useContext } from "react"
import { UserContext } from "../stateManagement/UserContext"
import { FavUserContext } from "../stateManagement/FavUserContext"

export const ShowUser = (props)=>{
    const {user} = props
    const {users,userDispatch} = useContext(UserContext)
    const {favUsers,favUserDispatch} = useContext(FavUserContext)

    return (
            <Card sx={{ maxHeight: 400, overflow: 'auto' , width : 500, margin:'10px' , padding:"10px",display:'flex'}}>
            <CardMedia
                component="img"
                sx={{ width: 151 , display: 'flex', flexDirection: 'column'}}
                image= {user.avatar_url}
                alt="user profile pic"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h4">
                        {user.name}
                    </Typography>
                    <Typography component="div" sx={{color:'#0874e0'}}>
                        {`@${user.login}`}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {user.bio}
                    </Typography>
                    <Box sx={{display:'flex'}} centered='true'>
                        <Box style={{margin:'8px'}}>
                            <Typography variant="h4">{user.followers}</Typography>
                            <Typography>Followers</Typography>
                        </Box>
                        <Box style={{margin:'8px'}}>
                            <Typography variant="h4">{user.following} </Typography>
                            <Typography>Following</Typography>
                        </Box>
                        <Box style={{margin:'8px'}}>
                            <Typography variant="h4">{user.public_repos} </Typography>
                            <Typography>Repos</Typography>
                        </Box>

                    </Box>
                </CardContent>
            </Box>
            <box sx={{ display: 'flex', flexDirection: 'column'}}>
                    
                <IconButton type="button" onClick={()=>{addRemoveFavUtility(user.id,users,userDispatch,favUsers,favUserDispatch)}} sx={{ p: '10px'}} aria-label="search">
                    <StarOutline style={{ color: user.starColor }}  />
                </IconButton>

            </box>
            </Card>
    )
}