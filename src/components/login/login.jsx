import React, {useState, useEffect} from "react";
import setAuthorizationToken from '../../components/utils/setAuthToken';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginUrl: "https://cab230.hackhouse.sh/login",
            submitting: false
        };
    }

    onChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    loginAttempt() {
        fetch("https://cab230.hackhouse.sh/login", {
            method: "POST",
            body: `email=g@g&password=gg`,
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        }).then(function (result) {

            const token = result.token;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            console.log("login success");
            console.log(token);
        }).catch(function (error) {
            console.log(
                "There has been a problem with your fetch operation: ",
                error.message
            );
        });
    }

    render() {
        return (
            <div className="login">
                <h2>LOGIN :</h2>
                <form
                    onSubmit={event => {
                        event.preventDefault();
                    }}
                >
                    <label htmlFor="name">Email:</label>

                    <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Email address"
                        value={this.state.email}
                        onChange={event => {
                            this.onChange(event);
                        }}
                    />
                    <br/>
                    <label htmlFor="name">Password:</label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={event => {
                            this.setPassword(event);
                        }}
                    />

                    <br/>
                    <button
                        onClick={event => {
                            // make_a_login_function_like_the_example();
                            /* WITHIN THIS FUNCTION YOU WILL SET THE TOKEN ONCE THE fetch RETURNS OK
                                        you do this by using props.onLogin(response.token)
                                        */
                            this.loginAttempt();
                        }}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
