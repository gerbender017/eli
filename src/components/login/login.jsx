import React from "react";
import {Form, Button} from "react-bootstrap";
import setAuthorizationToken from '../../components/utils/setAuthToken';
import Search from "../../App";
import SweetAlert from 'sweetalert2-react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            message: "",
            show: false,
            loginUrl: "https://cab230.hackhouse.sh/login",
        };
    }

    loginAttempt = () => {
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        console.log(email);
        console.log(password);
        fetch(this.state.loginUrl, {
            method: "POST",
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
                password
            )}`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.json();
            throw new Error("Network response was not ok.");
        }).then((result) => {


            this.setState({show: true, message: result.message});

        }).catch((error) => {
            console.log(
                "There has been a problem with your fetch operation: ",
                error.message
            );
        });
    };

    render() {
        return (
            <div className="login">

                <h2> Login </h2>
                <Form
                    onSubmit={event => {
                        event.preventDefault();
                    }}
                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id="email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id="password"/>
                    </Form.Group>

                    <Button
                        onClick={event => {
                            this.loginAttempt();
                        }}
                        type="submit"
                    >
                        Login
                    </Button>
                </Form>

                <SweetAlert
                    show={this.state.show}
                    title="CAB 230"
                    text={this.state.message}
                    onConfirm={() => this.setState({show: false})}
                />
            </div>
        );
    }
}
