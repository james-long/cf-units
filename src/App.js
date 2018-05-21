import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Unit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "NULL"
        };
    }

    componentDidMount(){
        fetch("units/" + this.props.id)
            //.then(({results}) => this.setState({name : results["Name"]}))
            .then((results) => {
                return results.json()
            })
            .then((resultsJSON) => {
                this.setState({name: resultsJSON["Name"]});
            })
            .catch((err) => console.log(err));
    }

    render(){
        return (<h1>{this.state.name}</h1>);
    }
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            units: [1, 2, 3, 4]
        };
    }

    render(){
        let unitList = [];
        for (let unitID of this.state.units){
            unitList.push(<Unit id={unitID}/>);
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                {unitList}
            </div>
        )
    }
}

/*
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            units: [1, 2, 3, 4]
        };
    }

    componentDidMount(){
        fetch("units/666", {method: "GET", headers: {"Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain", "mode" : "no-cors"}})
        //.then(({results}) => this.setState({name : results["Name"]}))
            .then((results) => {
                console.log(results);
                return results.json()
            })
            .then((resultsJSON) => {
                console.log(resultsJSON);
            })
            .catch((err) => console.log(err));
    }

    render(){

        return (
            <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            </header>
            </div>
        )
    }
}
*/
export default App;
