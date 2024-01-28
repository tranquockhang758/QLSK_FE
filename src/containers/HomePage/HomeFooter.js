import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeFooter.scss";
import { FormattedMessage } from 'react-intl';
import {languages} from "../../utils/constant";

import * as actions from "../../store/actions";
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
       
    }
    changeLanguage = (language) => {
        this.props.ChangeLanguage(language);
    }


    render() {
        return (
            <>
            <div className='home-footer-container'>
                <div className='content-left'>1</div>
                <div className='content-right'>2</div>
            </div>
            </>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        language:state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ChangeLanguage : (language) => dispatch(actions.ChangeLanguage(language)), 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
