import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeHeader.scss";
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
        let language = this.props.language;
        return (

            
            <>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='header-left-content'>
                        <i className='fas fa-bars'></i>
                        <div className='header-logo'>
                        </div>
                    </div>
                    <div className='header-middle-content'>
                        <div className='child-content'>
                            <div className='main-title'><b><FormattedMessage id="home-header.Speciality"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home-header.Find_Doctor_by_Speciality"/></div>
                        </div>
                        <div className='child-content'>
                            <div className='main-title'><b><FormattedMessage id="home-header.health_facilitiy"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home-header.Select_Hospital_Clinic"/></div>
                        </div>
                        <div className='child-content'>
                            <div className='main-title'><b><FormattedMessage id="home-header.Doctors"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home-header.Find_Good_Doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div className='main-title'><b><FormattedMessage id="home-header.Doctors"/></b></div>
                            <div className='sub-title'><FormattedMessage id="home-header.General_Health"/></div>
                        </div>
                    </div>
                    <div className='header-right-content'>
                        <div className='support'>
                            <i className="fas fa-question-circle"></i>
                        </div>
                        <div className={language === languages.VI ? 'language-vi action' : 'language-vi'} onClick={()=>this.changeLanguage('vi')}>VN</div>
                        <div className={language === languages.EN ? 'language-en action' : 'language-en'} onClick={()=>this.changeLanguage('en')}>EN</div>
                    </div>
                </div>
            </div>
            <div className='home-header-banner'>
                <div className='title1'><FormattedMessage id="home-header.Medical_Foundation"/></div>
                <div className='title2'><FormattedMessage id="home-header.Comprehensive_healthy_care"/></div>
                <div className='search'>
                    <div className="input-sub">
                            <i className="fas fa-search"></i>
                        <input type="text" className='search-input' placeholder={language === languages.VI ? "Nhập từ khóa để tìm kiếm" : "Enter your Word To Search Everything"}/>
                    </div>
                </div>
                <div className='options'>
                    <div className='sub-options'>
                        <div className='img-thumb1'></div>
                        <div className='title-options'><FormattedMessage id="home-header.specialist_examination"/></div>
                    </div>
                    <div className='sub-options'>
                        <div className='img-thumb2'>
                        </div>
                        <div className='title-options'><FormattedMessage id="home-header.remote_examination"/></div>
                    </div>
                    <div className='sub-options'>
                        <div className='img-thumb3'></div>
                        <div className='title-options'><FormattedMessage id="home-header.general_examination"/></div>
                    </div>
                    <div className='sub-options'>
                        <div className='img-thumb4'></div>
                        <div className='title-options'><FormattedMessage id="home-header.medical_test"/></div>
                    </div>
                    <div className='sub-options'>
                        <div className='img-thumb5'></div>
                        <div className='title-options'><FormattedMessage id="home-header.healthy_mental"/></div>
                    </div>
                    <div className='sub-options'>
                        <div className='img-thumb6'></div>
                        <div className='title-options'><FormattedMessage id="home-header.dental_examination"/></div>
                    </div>
                </div>
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
