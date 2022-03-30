import {useEffect, useContext} from 'react'
import PageContext from "./PageContext"
import { Link } from "react-router-dom";

const Home = () => {
    const context = useContext(PageContext)
    return(
        <>
            Home
        </>
    )
}

export default Home
