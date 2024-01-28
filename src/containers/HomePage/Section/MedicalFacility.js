import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./MedicalFacility.scss";
import Slider from "react-slick";
// ReactJS\node_modules\slick-carousel\slick
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import facilityImg  from "../../../../src/assets/images/Facility/152704logo-bvcr-moi.jpg";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
       
    }

    render() {
       
        return (
            <>
                <div className='section-facility'><div className='section-container'>
                        <div className='section-title'>
                            <h3 className='title'>Cơ sở y tế</h3>
                            <button className='btn-info'>Xem thêm</button>
                        </div>
                        <div className='section-content'>
                        <Slider {...this.props.settings}>
                        <div className='section-body'>
                            <img src={facilityImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ sở y tế 1</div>
                        </div>
                        <div className='section-body'>
                            <img src={facilityImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ sở y tế 2</div>
                        </div>
                        <div className='section-body'>
                            <img src={facilityImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ sở y tế 3</div>
                        </div>
                        <div className='section-body'>
                            <img src={facilityImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ sở y tế 4</div>
                        </div>
                        <div className='section-body'>
                            <img src={facilityImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ sở y tế 5</div>
                        </div>
                        <div className='section-body'>
                            <img src={facilityImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ sở y tế 6</div>
                        </div>
                        </Slider>
                        </div>
                        
                    </div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
