import { Button, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Dashboard = () =>
{
    const navigate = useNavigate();

    const logout = ()=>
    {
        navigate("/")
    }
    const addData = () =>
    {
        navigate("/add_data")
    }
    return(
        <div className="d-flex justify-content-center">
            <Form>
            <Row>
                <h1>Dashboard</h1>
            </Row>
            <Row>
                <Col>
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