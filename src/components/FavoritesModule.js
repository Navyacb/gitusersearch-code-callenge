import {Paper,Divider,Grid,IconButton,Typography} from '@mui/material';
import { useContext } from 'react';
import { FavUserContext } from '../stateManagement/FavUserContext';
import { ArrowBack,StarOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useStylesUtility } from '../helper/useStylesUtility';
import { ListUsers } from './ListUsers';

export const FavoritesModule = (props)=>{
    const {favUsers} = useContext(FavUserContext)
    const classes = useStylesUtility();

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
            {(favUsers.length>0) && (
                <Paper elevation={3} className={classes.paper}  style={{ maxHeight: 400, overflow: 'auto' , width : 500 }}>
                    <ListUsers items={favUsers} />
                </Paper>
            )}
        </Grid>
    )
}