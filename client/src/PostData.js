import { useState } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

function PostData() {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/posts/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                authorization: localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description })
        });

        const data = await res.json();

        if (!localStorage.getItem('token')) {
            navigate('/login')
            alert('please login to post');
        } else {
            console.log(data);
            navigate('/get')
            
        }
    };

    // const getData = async () => {

    //     const res = await fetch('http://localhost:5000/posts', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'Application/json',
    //             authorization: localStorage.getItem("token")
    //         }
    //     });

    //     const data = await res.json();

    //     if(data){
    //        console.log(data)
    //     }
    // };

    return (
        <div className='content'>
            {/* <form> */}
            <div>
                <label >Title: </label>
                <input type="text" placeholder="Enter Title" name="title" id="title" value={title} onChange={(e) => { setTitle(e.target.value) }} required ></input>
            </div>

            <div>
                <label >Description:
                    <textarea className='text' placeholder="enter some text" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }} required></textarea>
                    {/* <input type="text" placeholder="Enter description" name="description" id="description" ></input> */}
                </label>
            </div>

            <div>
                <input type="submit" value='Submit' name="submit" onClick={handleSubmit}></input>
            </div>

            {/* <div>
                    <input type="button" value='get' name="submit" onClick={getData}></input>
                </div> */}

            {/* </form> */}
        </div>
    )
}

export default PostData;
