import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import Doctors from './Section/Doctors';
import Handbook from './Section/Handbook';
import HomeFooter from "./HomeFooter";
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
       
    }


    render() {
        let settings = {
            // dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            centerPadding:0

        };
        return (
            <>
            <HomeHeader/>
            <Specialty settings = {settings}/>
            <MedicalFacility settings = {settings}/>
            <Doctors settings={settings}/>
            <Handbook settings= {settings}/>
            <HomeFooter/>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
