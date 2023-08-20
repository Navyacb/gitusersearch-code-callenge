import { Route, Routes } from "react-router-dom"
import { SearchModule } from "./components/SearchModule"
import { FavoritesModule } from "./components/FavoritesModule"
import { UserModule } from "./components/UserModule"

export const RouteLinks = (props)=>{
    return (
        <Routes>
            <Route path='/' element={<SearchModule />} exact={true} />
            <Route path='/favorites' element={<FavoritesModule/>}  />
            <Route path='/userDetails/:id' element={(<UserModule/>)} />
        </Routes>
    )
}