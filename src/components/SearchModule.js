import { useContext, useEffect , useState } from 'react';
import {Search,StarOutline} from '@mui/icons-material';
import {Paper,InputBase, IconButton, Grid, Divider} from '@mui/material';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { SearchList } from './SearchList';
import { UserContext } from '../stateManagement/UserContext';

export const SearchModule = (props)=>{
    const [searchText,setSearchText] = useState('')
    const {users,userDispatch} = useContext(UserContext)

    function handleSearchChange(e){
        setSearchText(e.target.value)
    }

    useEffect(()=>{
        console.log('env',process.env.REACT_APP_GITHUB_API_TOKEN)
        const token = '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'
        console.log(process.env.REACT_APP_GITHUB_API_TOKEN)
        if(searchText.length>2){
            (async function(){
                try{
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
                            return {...response2.data,starColor:'inherit'}
                    })
                    console.log('result',result)
                    const resolvedResults = await Promise.all(result);
                    userDispatch({type:'CREATE_LIST',payload:resolvedResults})
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
                <Divider />
                {(users.length>0) && <SearchList/>}
            </Grid>
    )
}