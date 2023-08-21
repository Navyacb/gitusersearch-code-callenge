import {Paper, InputBase, IconButton,} from '@mui/material';
import { useContext } from 'react';
import { SearchTextContext } from '../stateManagement/SearchTextContext';
import {Search,StarOutline} from '@mui/icons-material';
import { Link } from 'react-router-dom';


export const SearchList = (props)=>{
  const {searchText,searchTextDispatch} = useContext(SearchTextContext)

  function handleSearch(e){
    searchTextDispatch({type:'ADD_SEARCH',payload:e.target.value})
  }
   
    return (
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
    )
}