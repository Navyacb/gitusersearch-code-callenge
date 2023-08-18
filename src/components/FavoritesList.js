import {Paper} from '@mui/material';
import { useContext } from 'react';
import { ListUsers } from './ListUsers';
import { FavUserContext } from '../stateManagement/FavUserContext';

export const FavoritesList = (props)=>{
    const {favUsers} = useContext(FavUserContext)

    return (
        <Paper elevation={3}  style={{ maxHeight: 400, overflow: 'auto' , width : 500 }}>
            <ListUsers items={favUsers} />
        </Paper>
    )
}