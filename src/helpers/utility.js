import axios from 'axios'

export const usersBio = async(userUrl)=>{
    const token = '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'
    try{
        const user = await axios.get(`${userUrl}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }})
        const bio = user.data.bio
        return bio
    }
    catch(error){
        console.log('error while fetching bio data',error)
    }
}