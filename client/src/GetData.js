

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function GetData() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true)
    const [datas, setData] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch('http://localhost:5000/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json', 
                    authorization: localStorage.getItem("token")
                },

            });

            const data = await res.json();


            if (data) {
                setData(data.data);
                console.log(data.data)
                setIsLoading(false);
            }
            if (!localStorage.getItem('token')) {
                navigate('/login')
            }
        } catch (err) {
            console.log(err);
        }
    };

    const postDta = () => {
        navigate('/post')
    }

    const handleClick = () => {
        navigate('/logout');
    };

    useEffect(() => {
        getData();
    }, []);


    if (isLoading) {
        return (

            <h3>loading...</h3>

        )
    }

    return (
        <div>
            {/* <h3>loading...</h3> */}
            {datas.map((fileds) => {
                return (
                    <div key={fileds._id}>
                        <p>{fileds.title}</p>
                        <p>{fileds.description}</p>
                    </div>
                )
            })}

            <div>
                <input type="button" value='PostData' name="submit" onClick={postDta}></input>
            </div>
            <button onClick={handleClick}>logout</button>
        </div>
    )
}

export default GetData
