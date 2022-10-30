import React, { useState } from 'react'
import { Alert, Form, Modal } from 'react-bootstrap';
import GlobalButton from '../Components/Atoms/Global-button';
import { useMutation } from 'react-query';
import { API } from "../config/Api"
import { useNavigate } from 'react-router-dom';

function Register({ show, setShow, setShowLogin }) {
    const handleClose = () => setShow(false);
    const navigate = useNavigate()
    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "",
    });

    // handle on change
    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();

            const response = await API.post('/Register', form);

            if (response.data.code === 200) {
                const alert = (
                    <Alert variant="success" className="py-1">
                        Your registration success :).
                        <br />
                        Please click link below to login !!!
                    </Alert>
                )
                setMessage(alert);

                setForm({
                    email: "",
                    role: "",
                })

                const timer = setTimeout(navigates, 1000);

                function navigates() {
                    setShow(false);
                    setShowLogin(true);
                }
            }
        } catch (error) {

            console.log(error.response.data.message);
            const alert = (
                <Alert variant="danger" className="py-1">
                    {error.response.data.message}
                </Alert>
            )
            setMessage(alert);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title className='fs-1 fw-bold'>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type='text'
                                name='email'
                                onChange={handleOnChange}
                                value={form.email}
                                placeholder='Email'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Control
                                type='password'
                                name='password'
                                onChange={handleOnChange}
                                value={form.password}
                                placeholder='Password'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Select aria-label="Default select example"
                                name='role'
                                value={form.role}
                                onChange={handleOnChange}
                            >
                                <option hidden>Select Role</option>
                                <option value="User">As User</option>
                                <option value="Partner">As Partner</option>
                            </Form.Select>
                        </Form.Group>
                        <GlobalButton
                            name='Register'
                            type='submit'
                            className='btn link w-100 text-white border-0'
                        />
                    </Form>
                </Modal.Body>
                <p className='text-center'>
                    Alredy have an account ? click
                    <span
                        className='ms-1 fw-bold'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setShow(false);
                            setShowLogin(true);
                        }}
                    >
                        Here
                    </span>
                </p>
            </Modal>
        </>
    );
}

export default Register