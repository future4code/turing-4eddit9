import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const usePosts = (url, initialState, dataPost) => {
    const history = useHistory();
    const [data, setData] = useState(initialState);

    const token = window.localStorage.getItem("token");
    const headers = {headers: {Authorization: token}}

    const getPost = async () => {
        try {
            const response = await axios.get(url, headers)
                setData(response.data[dataPost])
            } catch(error) {
                 console.log(error.message)
        }
    }
    
    useEffect(() => {
        if(token === null) {
            history.push("/");
        } else {
            getPost()
        }
    }, []);

    
    return [data, getPost]

}

export default usePosts;