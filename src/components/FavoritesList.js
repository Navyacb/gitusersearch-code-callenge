import {Paper} from '@mui/material';
import { useContext } from 'react';
import { ListUsers } from './ListUsers';
import { FavUserContext } from '../stateManagement/FavUserContext';
import { useStylesUtility } from '../helper/useStylesUtility';

export const FavoritesList = (props)=>{
    const classes = useStylesUtility();
    const {favUsers} = useContext(FavUserContext)

    return (
        <Paper elevation={3} className={classes.paper}  style={{ maxHeight: 400, overflow: 'auto' , width : 500 }}>
            <ListUsers items={favUsers} />
        </Paper>
    )
}