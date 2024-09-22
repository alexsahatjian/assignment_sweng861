import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate  } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const Login = () => 
{
    const [submission, setSubmission] = useState({"username":"", "password":""});
    const [rememberSelection, setRemeberSelection] = useState(true);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => 
    {
        if(submission.username === "alex" )
        {
            if( submission.password === "password")
            {
                setError(false)
                navigate("/dashboard");
            }
            else
            {
                setError(true)
            }
        }
        else
        {
            setError(true)
        }
    };

    const changeHandler = e => 
    {
        setSubmission({...submission, [e.target.name]: e.target.value})
    }

    return(
        <div className="d-flex justify-content-center">
            <Form>
                <h3 style={{paddingBottom:"1em"}}>Login</h3>
                <div  className="w-auto">

                
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={changeHandler} name="username" type="text" placeholder="Enter username"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={changeHandler} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Check type="checkbox" label="Remember me?" />
                    </Col>
                    <Col>
                        <p><a href="">Forgot Password?</a></p>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                {error ? <p style={{color:"red"}}>Incorrect login</p> : null}
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary">
                    Submit
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default Login;