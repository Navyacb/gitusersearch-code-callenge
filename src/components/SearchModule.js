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

    const fetchUsers = async()=>{
        console.log('fetch')
        try{
            //fetching the user list based on search result
            const response1 = await searchUserAPI(searchText,page)
            const data = response1.data.items
               const result = data.map(async(item)=>{
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
            })

            const resolvedResults = await Promise.all(result);
            userDispatch({type:'CREATE_LIST',payload:resolvedResults}) 
            setPage(page + 1)
            setHasMore(resolvedResults.length > 0)   
        }
        catch(error){
            console.log("error while fetching data from git search API",error)
        }
    }

    useEffect(()=>{
        setHasMore(true)
        setPage(1)
        userDispatch({type:'UPDATE_LIST',payload:[]})
        if(searchText.length>2){
            fetchUsers()   
        }else{
            userDispatch({type:'UPDATE_LIST',payload:[]})
            setHasMore(true)
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
                     <Paper elevation={3} className={classes.paper} style={{ maxHeight: 400, overflow: 'auto' , width : 500 }}>
                        <ListUsers items={users} hasMore={hasMore} loadUsers={fetchUsers} />
                        {/* hasMore={hasMore} loadUsers={loadUsers} */}
                    </Paper>
                ): 
                <TextMessage />} 
            </Grid>
    )
}