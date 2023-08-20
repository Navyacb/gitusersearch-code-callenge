import {Paper} from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../stateManagement/UserContext';
import { ListUsers } from './ListUsers';
import { useStylesUtility } from '../helper/useStylesUtility';


export const SearchList = (props)=>{
    const classes = useStylesUtility();
    const {users} = useContext(UserContext)
    const {hasMore,loadUsers} = props

    return (
        <Paper elevation={3} className={classes.paper} style={{ maxHeight: 400, overflow: 'auto' , width : 500 }}>
            <ListUsers items={users} hasMore={hasMore} loadUsers={loadUsers} />
            {/* hasMore={hasMore} loadUsers={loadUsers} */}
        </Paper>
    )
}