import { Button, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";

const Dashboard = () =>
{
    const [customers, setCustomers] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        const retrieveCustomers = async () => 
            {
                const config = {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
                try
                {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/customers`, config)
                    setCustomers(response.data);
                }
                catch(error)
                {
                    console.log(error)
                }
            }
        retrieveCustomers();
    },[])

    const logout = async ()=>
    {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
        try
        {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/logout`, config)
            navigate('/');
        }
        catch(error)
        {
            console.log(error)
        }
    }
    const addData = () =>
    {
        navigate("/add_data")
    }

    const populateCustomers = () => 
    {
        console.log(customers);
        let rows =[];
        for(let i = 0; i < customers.length; i++)
        {
            rows.push(
                <tr>
                    <td>{customers[i].first_name}</td>
                    <td>{customers[i].last_name}</td>
                    <td>{customers[i].email}</td>
                    <td>{customers[i].phone}</td>
                    <td>{customers[i].address}</td>
                    <td>{customers[i].city}</td>
                    <td>{customers[i].state}</td>
                    <td>{customers[i].postal}</td>
                    <td>{customers[i].created_by}</td>
                </tr>
            )
        }
        return rows;
    }

    return(
        <div className="d-flex justify-content-center">
            <Form>
            <Row>
                <h1>Dashboard</h1>
            </Row>
            <Row>
                <h2>Customer List</h2>
            </Row>
            <Table striped>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {populateCustomers()}
                </tbody>
                
            </Table>
            <Row>
                <Col >
                    <Button onClick={addData}>Add</Button>
                </Col>
                <Col>
                    <Button onClick={logout}>Logout</Button>
                </Col>
            </Row>
            </Form>
        </div>
    );
}

export default Dashboard;