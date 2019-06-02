import React from "react";
import {Form, Button} from "react-bootstrap";
import SweetAlert from 'sweetalert2-react';


export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: "",
            password: "",
            message: "",
            show: false,
            url: "https://cab230.hackhouse.sh/register",
        };
    }

    register = () => {
        let password = document.getElementById("reg-password").value;
        let email = document.getElementById("reg-email").value;
        fetch(this.state.url, {
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
            <div className="registration">

                <h2> Registration </h2>
                <Form
                    onSubmit={event => {
                        event.preventDefault();
                    }}
                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id="reg-email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id="reg-password"/>
                    </Form.Group>

                    <Button
                        onClick={event => {
                            this.register();
                        }}
                        type="submit"
                    >
                        Register
                    </Button>

                    <SweetAlert
                        show={this.state.show}
                        title="CAB 230"
                        text={this.state.message}
                        onConfirm={() => this.setState({show: false})}
                    />

                </Form>
            </div>
        );
    }
}
