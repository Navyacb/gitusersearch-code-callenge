import axios from 'axios'
const token = process.env.REACT_APP_GITHUB_API_TOKEN

export const searchUserAPI = (searchText,page)=>{
    return axios.get(`https://api.github.com/search/users`, 
    {params: {
        q: searchText,
        per_page: 10, //loading first 10 search result before scroll
        page: page
    },
    headers:{
        Authorization : `Bearer ${token}`
    }});
}

export const userDetailsAPI = (url)=>{
    return axios.get(`${url}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }})

}