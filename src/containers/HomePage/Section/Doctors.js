import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Doctors.scss";
import Slider from "react-slick";
// ReactJS\node_modules\slick-carousel\slick
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import doctorsImg from "../../../../src/assets/images/Doctors/bsckii-tran-minh-khuyen.jpg"
class Speciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
       
    }

    render() {
        // let settings = {
        //     // dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 4,
        //     slidesToScroll: 1,
        //     centerPadding:0

        // };
        return (
            <>
                <div className='section-doctors'>             
                    <div className='section-container'>
                        <div className='section-title'>
                            <h3 className='title'>Bác sỹ nổi bật</h3>
                            <button className='btn-info'>Xem thêm</button>
                        </div>
                        <div className='section-content'>
                        <Slider {...this.props.settings}>
                        <div className='section-body'>
                            <img src={doctorsImg} className='img-thumbnail-body'/>
                            <div className='section-body-title-first'>Bác sỹ chuyên khoa II Trần Minh Khuyên</div>
                            <div className='section-body-title-second'>Sức khỏe tinh thân, tư vấn, trị liệu tâm lý</div>
                        </div>
                        <div className='section-body'>
                            <img src={doctorsImg} className='img-thumbnail-body'/>
                            <div className='section-body-title-first'>Bác sỹ chuyên khoa II Trần Minh Khuyên</div>
                            <div className='section-body-title-second'>Sức khỏe tinh thân, tư vấn, trị liệu tâm lý</div>
                        </div>
                        <div className='section-body'>
                            <img src={doctorsImg} className='img-thumbnail-body'/>
                            <div className='section-body-title-first'>Bác sỹ chuyên khoa II Trần Minh Khuyên</div>
                            <div className='section-body-title-second'>Sức khỏe tinh thân, tư vấn, trị liệu tâm lý</div>
                        </div>
                        <div className='section-body'>
                            <img src={doctorsImg} className='img-thumbnail-body'/>
                            <div className='section-body-title-first'>Bác sỹ chuyên khoa II Trần Minh Khuyên</div>
                            <div className='section-body-title-second'>Sức khỏe tinh thân, tư vấn, trị liệu tâm lý</div>
                        </div>
                        <div className='section-body'>
                            <img src={doctorsImg} className='img-thumbnail-body'/>
                            <div className='section-body-title-first'>Bác sỹ chuyên khoa II Trần Minh Khuyên</div>
                            <div className='section-body-title-second'>Sức khỏe tinh thân, tư vấn, trị liệu tâm lý</div>
                        </div>
                        <div className='section-body'>
                            <img src={doctorsImg} className='img-thumbnail-body'/>
                            <div className='section-body-title-first'>Bác sỹ chuyên khoa II Trần Minh Khuyên</div>
                            <div className='section-body-title-second'>Sức khỏe tinh thân, tư vấn, trị liệu tâm lý</div>
                        </div>
                        </Slider>
                        </div>
                        
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
