import { useContext, useEffect, useState } from 'react';
import {Search,StarOutline} from '@mui/icons-material';
import {Paper,InputBase, IconButton, Grid, Divider} from '@mui/material';
import { Link } from 'react-router-dom';
import { SearchList } from './SearchList';
import { UserContext } from '../stateManagement/UserContext';
import { SearchTextContext } from '../stateManagement/SearchTextContext';
import { FavUserContext } from '../stateManagement/FavUserContext';
import { TextMessage } from './TextMessage';
import { searchUserAPI,userDetailsAPI } from '../helper/apiUtility';

export const SearchModule = (props)=>{
    const {searchText,searchTextDispatch} = useContext(SearchTextContext)
    const {users,userDispatch} = useContext(UserContext)
    const {favUsers} = useContext(FavUserContext)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    function handleSearch(e){
        searchTextDispatch({type:'ADD_SEARCH',payload:e.target.value})
    }

    const fetchUsers = async()=>{
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
                <Paper elevation={0} sx={{width:'500px'}}>
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search"  edge="start">
                            <Search/>
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1, width:'80%' }}
                            placeholder="Search GitHUb users..."
                            inputProps={{ 'aria-label': 'Search GitHUb users...' }}
                            value={searchText}
                            onChange={handleSearch}
                        />
                        <Link to='/favorites'>
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="star"  edge="end">
                                <StarOutline />
                            </IconButton>
                        </Link>
                </Paper>
                </Paper>
                <Divider />
                {/* hasMore={hasMore} loadUsers={fetchUsers} */}
                {(users.length>0) ? <SearchList hasMore={hasMore} loadUsers={fetchUsers} /> : <TextMessage />} 
            </Grid>
    )
}