import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
    
    state = {
        searchValue: "",
        broad: []
    };
    handleOnChange = event => {
        this.setState({ searchValue: event.target.value });
    };
    handleSearch = () => {
        this.makeApiCall(this.state.searchValue);
    }
    makeApiCall = searchInput => {
        var searchUrl = `https://help-search-api-prod.herokuapp.com/search?query=${searchInput}`;
        fetch(searchUrl).then(
            response => response.json())
            .then(data => { 
                console.log(data); 
                this.setState({ 
                    broad: data.results
                });
            });
        // .then(jsonData => {
        //     this.setState({ broad: jsonData.broadband });
        //     console.log(jsonData.broadband)
        // });
    };
render() {
    return (
        <div>
        <h1>Welcome to the cognizent text search app</h1>
        <input
        name="text"
        type="text"
        placeholder="Search"
        onChange={event => this.handleOnChange(event)}
        value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.broad ? (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">URL</th>
                            </tr>
                        </thead>
                        <tbody className="trhover">
                            {this.state.broad.map((broad, index) => (
                                <tr key={index}>
                                    <td>{broad.title}</td>
                                    <td>{broad.description}</td>
                                    <td>{broad.url}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            ) : (
            <p>Try searching for a broadband</p>
        )}
        </div>
        );
}
}
export default Search;