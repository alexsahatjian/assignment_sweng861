import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2'
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import axios from 'axios';

const AddData = () =>
{
    const [submission, setSubmission] = useState(
    {
        "first_name" : "",
        "last_name" : "",
        "email" : "",
        "phone" :"",
        "address" : "",
        "city" : "",
        "postal" : "",
        "state" : ""
    })
    const [validFirst, setValidFirst] = useState(false);
    const [validLast, setValidLast] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validPhone, setValidPhone] = useState(false);
    const [validCity, setValidCity] = useState(false);
    const [validPostal, setValidPostal] = useState(false);
    const [incomplete, setIncomplete] = useState(false);

    const navigate = useNavigate();

    const states = ["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
    
    
    const handleSubmit = async (event) => 
    {
        let checkvalid = validate();
        if(checkvalid)
        {
            const config = {
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            const body = JSON.stringify({
                "first_name" : submission.first_name,
                "last_name" : submission.last_name,
                "email" : submission.email,
                "phone" : submission.phone,
                "address" : submission.address,
                "city" : submission.city,
                "postal" : submission.postal,
                "state" : submission.state
            })
            try 
            {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add_new_customer`, body ,config)
                Swal.fire({
                    title: "Success",
                    text: "Your data has been added",
                    icon: 'success',
                    confirmButtonText: true,
                    confirmButtonColor: '#198754',
                    confirmButtonText: 'Go Home',
                }).then(() =>{
                    navigate("/dashboard");                
                })
            }
            catch(error)
            {
                console.log(error);
            }
            
        }
    }

    const validate = () => 
    {
        let checkValid = true;
        if(/\d/.test(submission.first_name))
        {
            setValidFirst(true);
            checkValid = false;
        }
        else
        {
            setValidFirst(false);
        }
        if(/\d/.test(submission.last_name))
        {
            setValidLast(true);
            checkValid = false;
        }
        else
        {
            setValidLast(false)
        }
        if(!(submission.email.includes("@")))
        {
            setValidEmail(true)
            checkValid = false;
        }
        else
        {
            setValidEmail(false)
        }
        if(submission.phone.toString().length !== 10)
        {
            setValidPhone(true)
            checkValid = false;
        }
        else
        {
            setValidPhone(false)
        }
        if(/\d/.test(submission.city))
        {
            setValidCity(true)
            checkValid = false;
        }
        else
        {
            setValidCity(false)
        }
        if(submission.postal.toString().length !== 5)
        {
            setValidPostal(true)
            checkValid = false;
        }
        else
        {
            setValidPostal(false)
        }
        if(submission.first_name === "" || submission.last_name === "" || submission.email === "" || submission.phone === "" ||submission.address === "" || submission.city === "" || submission.postal === "")
        {
            setIncomplete(true)
            checkValid = false;
        }
        else
        {
            setIncomplete(false)
        }
        return checkValid;
    }

    const changeHandler = e => 
    {
        setSubmission({...submission, [e.target.name]: e.target.value})
    }
    const populateOptions = () => 
    {
        const options = [];
        for(let i = 0; i < states.length; i++)
        {
            options.push(
                <option>{states[i]}</option>
            )
        }
        return options
    }

    return(
        <div className="d-flex justify-content-center">
            <Form>
                <h2 style={{marginBottom:"1em"}}>Add Customer</h2>
                <Row>
                    <Col>
                        <Form.Group style={{marginBottom:".5em"}}>
                            <Form.Label style={{marginBottom:".1em"}}>First Name</Form.Label>
                            <Form.Control onChange={changeHandler} name="first_name" placeholder="Enter first name"/>
                        </Form.Group>
                        {validFirst ? <p style={{color:"red"}}>Cannot contain numbers</p> : null}
                    </Col>
                    <Col>
                        <Form.Group style={{marginBottom:".5em"}}>
                            <Form.Label style={{marginBottom:".1em"}}>Last Name</Form.Label>
                            <Form.Control onChange={changeHandler} name="last_name" placeholder="Enter last name"/>
                        </Form.Group>
                        {validLast ? <p style={{color:"red"}}>Cannot contain numbers</p> : null}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group style={{marginBottom:".5em"}}>
                            <Form.Label style={{marginBottom:".1em"}}>Email</Form.Label>
                            <Form.Control onChange={changeHandler} name="email" type="email" placeholder="Enter email"/>
                        </Form.Group>
                        {validEmail ? <p style={{color:"red"}}>Please enter valid email</p> : null}
                    </Col>
                    <Col>
                        <Form.Group style={{marginBottom:".5em"}}>
                            <Form.Label style={{marginBottom:".1em"}}>Phone</Form.Label>
                            <Form.Control onChange={changeHandler} name="phone" type="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Enter phone number"/>
                        </Form.Group>
                        {validPhone ? <p style={{color:"red"}}>Must contain 10 digits</p> : null}
                    </Col>
                </Row>
                
                
                
                <Form.Group className="mb-3" style={{marginBottom:".5em"}}>
                    <Form.Label style={{marginBottom:".1em"}}>Address</Form.Label>
                    <Form.Control onChange={changeHandler} name="address" placeholder="Enter address"/>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group style={{marginBottom:".5em"}}>
                            <Form.Label style={{marginBottom:".1em"}}>City</Form.Label>
                            <Form.Control onChange={changeHandler} name="city" placeholder="Enter city"/>
                            {validCity ? <p style={{color:"red"}}>Cannot contain numbers</p> : null}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group style={{marginBottom:"1em"}}>
                            <Form.Label style={{marginBottom:".1em"}}>State</Form.Label>
                            <Form.Select placeholder="Select state" onChange={changeHandler}  name="state" defaultValue="AK">
                                {populateOptions()}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group style={{marginBottom:".5em"}}>
                            <Form.Label style={{marginBottom:".1em"}}>Postal Code</Form.Label>
                            <Form.Control onChange={changeHandler} type="number" name="postal" placeholder="Enter postal code"/>
                            
                        </Form.Group>
                        {validPostal ? <p style={{color:"red"}}>Must contain 5 digits</p> : null}
                    </Col>
                </Row>
                {incomplete ? <p style={{color:"red"}}>All inputs must be filled out</p> : null}
                <Button onClick={handleSubmit} variant="primary">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default AddData;