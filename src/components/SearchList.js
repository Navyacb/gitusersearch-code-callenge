import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useContext } from 'react';
import { UserContext } from '../stateManagement/UserContext';
import { ListUsers } from './ListUsers';

//custom CSS rule for the scrollbar
const useStyles = makeStyles({
    paper: {
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        borderRadius: '2px',
      },
    },
  });

export const SearchList = (props)=>{
    const classes = useStyles();
    const {users} = useContext(UserContext)

    return (
        <Paper elevation={3} className={classes.paper} style={{ maxHeight: 400, overflow: 'auto' , width : 500 }}>
            <ListUsers items={users} />
        </Paper>
    )
}