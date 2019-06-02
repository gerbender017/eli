import React from "react";
import setAuthorizationToken from "../../components/utils/setAuthToken";
import {Table, Form} from "react-bootstrap";

export default class Search extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            searchKey: "",
            data: []
        };
    }

    SearchAttempt() {
        //The parameters of the call
        let getParam = {method: "GET"};
        const token = localStorage.jwtToken;
        console.log("find me adam: ", token);
        let head = {Authorization: `Bearer ${token}`};
        getParam.headers = head;

        let gender = document.getElementById("gender").value;
        let age = document.getElementById("age").value;

        if (this.state.searchKey == '') {
            alert("please select Crime!");
            return false;
        }


        //The URL
        const baseUrl = "https://cab230.hackhouse.sh/search?";
        const query = "offence=" + this.state.searchKey + "&age=" + age + "&gender=" + gender;
        const url = baseUrl + query;

        fetch(encodeURI(url), getParam)
            .then((response) => {
                if (response.ok) {
                    setAuthorizationToken(localStorage.jwToken);
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((result) => {
                this.setState({data: result.result});
            })
            .catch((error) => {
                console.log(
                    "There has been a problem with your fetch operation: ",
                    error.message
                );
            });
    }

    setSearch(e) {
        this.setState({
            searchKey: e.target.value
        });
    }


    render() {
        return (
            <div>
                <h3>SEARCH : </h3>
                <br/>
                <form
                    onSubmit={event => {
                        event.preventDefault();
                        this.SearchAttempt();
                    }}
                >
                    <label htmlFor="name">Search:</label>
                    <input
                        name="text"
                        id="text"
                        type="text"
                        placeholder="Enter query"
                        value={this.state.searchKey}
                        onChange={event => {
                            this.setSearch(event);
                        }}
                    />


                    <br/>

                    <h2> Filters </h2>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" id="gender">
                            <option value=""> -- select an option --</option>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                    </Form.Group>

                    <br/>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Age</Form.Label>
                        <Form.Control as="select" id="age">
                            <option value=""> -- select an option --</option>
                            <option>Adult</option>
                            <option>Juvenile</option>
                        </Form.Control>
                    </Form.Group>


                    <button
                        onClick={event => {
                            this.SearchAttempt();
                        }}
                        type="submit"
                    >
                        Search

                    </button>
                </form>
                <h2> Query Responses </h2>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>LGA</th>
                        <th>LNG</th>
                        <th>Total</th>
                    </tr>
                    </thead>

                    {this.state.data.map((listValue, index) => {
                        return (
                            <tbody>
                            <tr key={index}>
                                <td>{listValue.LGA}</td>
                                <td>{listValue.lat}</td>
                                <td>{listValue.lng}</td>
                                <td>{listValue.total}</td>
                            </tr>
                            </tbody>
                        );
                    })}
                </Table>

            </div>
        );
    }
}

