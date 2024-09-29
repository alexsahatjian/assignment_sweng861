import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, Navigate, useNavigate  } from 'react-router-dom';

const CreateUser = () =>
{
    const [user, setUser] = useState({"username":"", "password": ""})

    const navigate = useNavigate();

    const changeHandler = e =>
    {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>
    {
        if(user.username != "" && user.password != "")
        {
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            const body = JSON.stringify({
                "username": user.username,
                "password" : user.password
            })
            try{
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, body ,config)
                navigate("/");
            }catch(error){
                console.log(error)
            }
        }
        
        
        //TODO: Add validation of password
    }

    return(
        <div className="d-flex justify-content-center">
            <Form>
                <h2 style={{marginBottom:"1em"}}>Create New User</h2>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={changeHandler} placeholder="Enter a new username" type="text" name="username"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={changeHandler} name="password" type="password" placeholder="Enter a new password" />
                </Form.Group>
                <Button style={{marginTop:".5em"}} onClick={handleSubmit} variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default CreateUser;