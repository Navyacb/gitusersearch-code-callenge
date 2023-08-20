import { ShowUser } from "./ShowUser";
import {Paper,Divider,Grid,IconButton} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../stateManagement/UserContext";

export const UserModule = (props)=>{
    const {users} = useContext(UserContext)
    const {id} = useParams()
    const user = users.find(user=>{
        return user.id==id
    })

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
            {`@${user.login}`}
            </Paper>
        </Paper>
        <Divider />
        <ShowUser user={user}/>
        </Grid>
    )
}