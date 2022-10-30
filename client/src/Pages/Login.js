import React, { useContext, useState } from 'react'
import { Alert, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GlobalButton from '../Components/Atoms/Global-button';
import GlobalForm from '../Components/Atoms/Global-form';
import { UserContext } from '../context/User-context';
import { useMutation } from 'react-query';
import { API } from '../config/Api';


function Login({ show, setShow, setShowRegister }) {
    const title = "Login";

    const handleClose = () => setShow(false)
    const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    })

    const handleOnChange = (e) => {
        setFormLogin({
            ...formLogin, [e.target.name]: e.target.value,
        });
    }
    const HandleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const dataLogin = await API.post("/Login", formLogin);
            // console.log(dataLogin);

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: dataLogin.data.data,
            })

            var users = dataLogin.data.data
            if (users.role === "Partner") {
                navigate("/Admin")
                setShow(false)
            } else if (users.role === "User") {
                navigate("/User")
                setShow(false)
            }

        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Email or password wrong
                </Alert>
            )

            setMessage(alert);
        }
    });



    return (
        <>
            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title className='modal-title fs-1 fw-bold'>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message && message}
                    <Form onSubmit={(e) => HandleOnSubmit.mutate(e)}>
                        <Form.Group className='mb-3'>
                            <GlobalForm
                                type='text'
                                name='email'
                                onChange={handleOnChange}
                                value={formLogin.email}
                                placeholder='Email'
                                required='required'
                                autofocus='autofocus'
                                autocomplete='off'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <GlobalForm
                                type='password'
                                name='password'
                                onChange={handleOnChange}
                                value={formLogin.password}
                                placeholder='Password'
                                required='required'
                            />
                        </Form.Group>
                        <GlobalButton
                            name='Login'
                            type='submit'
                            className='btn link w-100 text-white border-0 mt-2'

                        />
                    </Form>
                </Modal.Body>
                <p className='text-center'>
                    Don't have an account ? click
                    <span
                        className='ms-1 fw-bold'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setShow(false);
                            setShowRegister(true);
                        }}
                    >
                        Here
                    </span>
                </p>
            </Modal>
        </>
    )
}

export default Login;