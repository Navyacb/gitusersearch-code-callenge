import { useEffect, useReducer, useState } from 'react';
import {Search,StarOutline} from '@mui/icons-material';
import {Paper,InputBase, IconButton, Grid, Divider} from '@mui/material';
import axios from 'axios'
import { SearchList } from './SearchList';
import {usersBio} from '../helpers/utility'

export const SearchModule = (props)=>{
    const [searchText,setSearchText] = useState('')
    const [users,userDispatch] = useReducer(userReducer,[])

    function handleSearchChange(e){
        setSearchText(e.target.value)
    }

    function userReducer(state,action){
        if(action.type === 'CREATE_LIST' || action.type==='UPDATE_USER'){
            return action.payload
        }
    }

    useEffect(()=>{
        const token = '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'
        console.log(process.env.REACT_APP_GITHUB_API_TOKEN)
        if(searchText.length>2){
            (async function(){
                try{
                    const response = await axios.get(`https://api.github.com/search/users?q=${searchText}`,{
                    headers:{
                        Authorization : `Bearer ${token}`
                    }});
                    console.log(response.data.items)
                    const result = response.data.items.map(item=>{
                            const userBio = usersBio(item.url)
                            // usersBio(item.url)
                            // .then(bio=>{
                            //     userBio = bio
                            // })
                            // .catch(error=>{
                            //     console.log('error while fetching user bio',error)
                            // })
                            return {...item,starColor:'inherit',bio : userBio}
                    })
                    console.log('result',result)
                    userDispatch({type:'CREATE_LIST',payload:result})
                }
                catch(error){
                    console.log("error while fetching data from git search API",error)
                }
            })()
        }
    },[searchText])

    return (
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Paper sx={{width:'inherit',textAlign:'center' }}>
                    <Paper component="form"  elevation={0}>
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <Search/>
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search GitHUb users..."
                            inputProps={{ 'aria-label': 'Search GitHUb users...' }}
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <StarOutline />
                        </IconButton>
                    </Paper>
                </Paper>
                <Divider />
                {(users.length>0) && <SearchList users={users} userDispatch={userDispatch} />}
            </Grid>
    )
}