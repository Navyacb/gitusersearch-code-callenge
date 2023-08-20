import {Paper,Divider,Grid,IconButton,Typography} from '@mui/material';
import { FavoritesList } from './FavoritesList';
import { useContext } from 'react';
import { FavUserContext } from '../stateManagement/FavUserContext';
import { ArrowBack,StarOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const FavoritesModule = (props)=>{
    const {favUsers} = useContext(FavUserContext)

    return (
        <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
            <Paper sx={{width:'inherit',display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
            <Paper elevation={0} sx={{width:'500px'}}>
                <Link to='/'>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="back">
                        <ArrowBack/>
                    </IconButton>
                </Link>
                <Typography variant='p'>Favorites</Typography>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="star">
                    <StarOutline sx={{color:'yellow'}} />
                </IconButton>
            </Paper>
            </Paper>
            <Divider />
            {(favUsers.length>0) && <FavoritesList/>}
        </Grid>
    )
}