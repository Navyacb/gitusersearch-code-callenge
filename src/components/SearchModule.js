import { useContext, useEffect, useState } from 'react';
import {Paper,Grid, Divider} from '@mui/material';
import { SearchList } from './SearchList';
import { UserContext } from '../stateManagement/UserContext';
import { SearchTextContext } from '../stateManagement/SearchTextContext';
import { FavUserContext } from '../stateManagement/FavUserContext';
import { TextMessage } from './TextMessage';
import { searchUserAPI,userDetailsAPI } from '../helper/apiUtility';
import { ListUsers } from './ListUsers';
import { useStylesUtility } from '../helper/useStylesUtility';

export const SearchModule = (props)=>{
    const {searchText} = useContext(SearchTextContext)
    const {users,userDispatch} = useContext(UserContext)
    const {favUsers} = useContext(FavUserContext)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const classes = useStylesUtility();
    const [text,setText] = useState('')

    const fetchUsers = async()=>{
        try{
            //fetching the user list based on search result
            const response1 = await searchUserAPI(searchText,page)
            const data = response1.data.items
            const result = await Promise.all(
                data.map(async(item)=>{
                    //fetching complete user details like bio,followers,repo
                    const response2 = await userDetailsAPI(item.url)
               
                        if(favUsers.length>0){
                            const favData = favUsers.find(fav=>{
                                return fav.id === response2.data.id
                            })
                            if(favData){
                                return {...response2.data,starColor:favData.starColor}
                            }else{
                                return {...response2.data,starColor:'inherit'}
                            }
                        }else{
                            return {...response2.data,starColor:'inherit'}
                        }
            }))

            userDispatch({type:'CREATE_LIST',payload:result}) 
            if (result.length > 0) {
                setPage((prevPage) => prevPage + 1);
            }
            setHasMore(result.length >= 10) 
            if(result){
                setText('Loading...')
            }  else{
                setText('No Search Results...')
            }
        }
        catch(error){
            console.log("error while fetching data from git search API",error)
            setText('No Search Results found...')
        }
    }

    useEffect(()=>{
        if(searchText.length>2){
            setPage(1);
            userDispatch({ type: 'UPDATE_LIST', payload: [] });
            setHasMore(true)
            fetchUsers()   
        }else{
            userDispatch({type:'UPDATE_LIST',payload:[]})
            setHasMore(false)
            setPage(1)
        }
    },[searchText])

    return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Paper sx={{width:'inherit',display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
                    <SearchList/>
                </Paper>
                <Divider />
                {(users.length>0) ? 
                (
                     <Paper elevation={3} className={classes.paper} style={{ overflow: 'auto' , width : 500 }}>
                        <ListUsers items={users} hasMore={hasMore} loadUsers={fetchUsers} />
                        {/* hasMore={hasMore} loadUsers={loadUsers} */}
                    </Paper>
                ): 
                <TextMessage text={text} />} 
            </Grid>
    )
}