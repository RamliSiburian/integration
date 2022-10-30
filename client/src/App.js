import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { PrivateRoute } from './Components/Config/Navgations';
import { API, setAuthToken } from './config/Api';
import Admin from './Pages/Admin';
import User from './Pages/User';
import Home from './Pages/Home';
import DetailRestaurants from './Pages/DetailRestaurant';
import Profile from './Pages/Profile';
import EditProfile from './Pages/Edit-profile';
import AddProduk from './Pages/Add-produk';
import ChartOrder from './Pages/Chart-order';
import Incometransaction from './Components/Income-transaction';
import { UserContext } from './context/User-context';


function App() {
    const [state, dispatch] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true)

    const checkUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {

            const response = await API.get("/check-auth");
            // console.log(response);
            let payload = response.data.data;
            payload.token = localStorage.token;

            dispatch({
                type: "USER_SUCCESS",
                payload,
            });
            setIsLoading(false)
        } catch (error) {
            // console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.token) {
            checkUser();
        }
    }, []);

    return (
        <>
            {isLoading ? <></> :
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/' element={<PrivateRoute />}>
                        <Route exact path='/Admin' element={<Admin />} />
                        <Route exact path='/User' element={<User />} />
                        <Route exact path='/Home' element={<Home />} />
                        <Route exact path='/DetailResto' element={<DetailRestaurants />} />
                        {/* <Route exact path='/DetailResto/:resto' element={<DetailRestaurants />} /> */}
                        <Route exact path='/Profile/:id' element={<Profile />} />
                        <Route exact path='/EditProfile/:id' element={<EditProfile />} />
                        <Route exact path='/AddProduct' element={<AddProduk />} />
                        <Route exact path='/ChartOrder' element={<ChartOrder />} />
                        <Route exact path='/IncomeTransaction' element={<Incometransaction />} />
                    </Route>
                </Routes>
            }
        </>
    )
}

export default App