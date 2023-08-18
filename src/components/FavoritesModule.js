import {Paper,Divider,Grid} from '@mui/material';
import { FavoritesList } from './FavoritesList';
import { useContext } from 'react';
import { FavUserContext } from '../stateManagement/FavUserContext';

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
                header
            </Paper>
            <Divider />
            {(favUsers.length>0) && <FavoritesList/>}
        </Grid>
    )
}