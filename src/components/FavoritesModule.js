import {Paper,Divider,Grid,IconButton} from '@mui/material';
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
            <Paper sx={{width:'inherit',textAlign:'center' }}>
                <Link to=''>
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="back">
                        <ArrowBack/>
                    </IconButton>
                </Link>
                Favorites
                <IconButton type="button" sx={{ p: '10px' }} aria-label="star">
                    <StarOutline sx={{color:'yellow'}} />
                </IconButton>
            </Paper>
            <Divider />
            {(favUsers.length>0) && <FavoritesList/>}
        </Grid>
    )
}