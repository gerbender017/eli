import React from "react";
import setAuthorizationToken from "../../components/utils/setAuthToken";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKey: ""
    };
  }

  SearchAttempt() {
    //The parameters of the call
    let getParam = { method: "GET" };
    const token = localStorage.jwtToken;
    console.log("find me adam: ", token);
    let head = { Authorization: `Bearer ${token}` };
    getParam.headers = head;

    //The URL
    const baseUrl = "https://cab230.hackhouse.sh/search?";
    const query = "offence=" + this.state.searchKey;
    const url = baseUrl + query;

    fetch(encodeURI(url), getParam)
      .then(function(response) {
        if (response.ok) {
          setAuthorizationToken(localStorage.jwToken);

          let data = response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(function(result) {
        let appDiv = document.getElementById("app");
        appDiv.innerHTML = JSON.stringify(result);
        console.log(result);
      })
      .catch(function(error) {
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
        <h2>SEARCH : </h2>
        <br />
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
          <button
            onClick={event => {
              this.SearchAttempt();
            }}
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}
