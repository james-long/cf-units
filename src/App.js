import React, { Component } from 'react';
import "react-bootstrap";
import './App.css';

class Unit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            unitInfo : {},
            unitImageSrc : ""
        };
    }

    componentDidMount(){
        fetch("units/" + this.props.id)
            .then((results) => {
                return results.json();
            })
            .then((resultsJSON) => {
                this.setState({unitInfo: resultsJSON});
            })
            .catch((err) => console.log(err));

        fetch("unitimages/" + this.props.id)
            .then((results) => {
                this.setState({unitImageSrc: results["url"]});
            })
            .catch((err) => console.log(err));
    }

    render(){
        const unitInfo = this.state["unitInfo"];
        const unitImageSrc = this.state["unitImageSrc"];

        const containerStyle = {
            backgroundColor : unitInfo["Color"],
            marginBottom : "10px",
            marginTop : "10px",
            padding : "10px 0px 10px 0px"
        };

        const textStyle = {
            color : "white"
        };

        return (
            <div className = "col-lg-8 offset-lg-2" style = {containerStyle}>
                <img src = {unitImageSrc}/>
                <p style = {textStyle}>
                    {unitInfo["Name"] === undefined ?
                        "NOT A UNIT" : unitInfo["Name"]}
                </p>
            </div>
        );
    }
}

class App extends Component {
    constructor(props){
        super(props);

        let initialUnits = [];
        for(let i = 1; i < 100; i++){
            initialUnits.push(i);
        }

        this.state = {
            units: initialUnits
        };
    }

    render(){
        let unitList = [];
        for (let unitID of this.state.units){
            unitList.push(<Unit id={unitID} key={unitID}/>);
        }
        return (
            <div className="App">
                <header className="App-header">
                </header>
                <div />
                {unitList}
            </div>
        )
    }
}

export default App;
