import { useContext, useEffect } from 'react';
import {Search,StarOutline} from '@mui/icons-material';
import {Paper,InputBase, IconButton, Grid, Divider} from '@mui/material';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { SearchList } from './SearchList';
import { UserContext } from '../stateManagement/UserContext';
import { SearchTextContext } from '../stateManagement/SearchTextContext';
import { FavUserContext } from '../stateManagement/FavUserContext';
import { TextMessage } from './TextMessage';

export const SearchModule = (props)=>{
    const {searchText,searchTextDispatch} = useContext(SearchTextContext)
    const {users,userDispatch} = useContext(UserContext)
    const {favUsers} = useContext(FavUserContext)

    function handleSearchChange(e){
        searchTextDispatch({type:'ADD_SEARCH',payload:e.target.value})
    }

    useEffect(()=>{
        if(searchText.length>2){
            (async function(){
                try{
                    const token = process.env.REACT_APP_GITHUB_API_TOKEN
                    //fetching the user list based on search result
                    const response1 = await axios.get(`https://api.github.com/search/users?q=${searchText}`,{
                    headers:{
                        Authorization : `Bearer ${token}`
                    }});
                    const data = response1.data.items

                       const result = data.map(async(item)=>{
                            //fetching complete user details like bio,followers,repo
                            const response2 = await axios.get(`${item.url}`,{
                                headers:{
                                    Authorization : `Bearer ${token}`
                                }})
                       
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
                }
                catch(error){
                    console.log("error while fetching data from git search API",error)
                }
            })()
        }else{
            userDispatch({type:'UPDATE_LIST',payload:[]})
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
                    <Paper component="form"  elevation={0}>
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search"  edge="start">
                            <Search/>
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search GitHUb users..."
                            inputProps={{ 'aria-label': 'Search GitHUb users...' }}
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <Link to='/favorites'>
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="star"  edge="end">
                                <StarOutline />
                            </IconButton>
                        </Link>
                    </Paper>
                </Paper>
                </Paper>
                <Divider />
                {(users.length>0) ? <SearchList/> : <TextMessage />} 
            </Grid>
    )
}