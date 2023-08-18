import { Route, Routes } from "react-router-dom"
import { SearchModule } from "./components/SearchModule"
import { FavoritesModule } from "./components/FavoritesModule"

export const RouteLinks = (props)=>{
    return (
        <Routes>
            <Route path='' element={<SearchModule />} exact={true} />
            <Route path='/favorites' element={<FavoritesModule/>} />
        </Routes>
    )
}