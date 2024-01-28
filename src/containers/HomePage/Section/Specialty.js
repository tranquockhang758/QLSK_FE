import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Specialty.scss";
import Slider from "react-slick";
// ReactJS\node_modules\slick-carousel\slick
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import specialtyImg from "../../../../src/assets/images/Speciality/112457-co-xuong-khop.jpg"
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
                <div className='section-specialty'>             
                    <div className='section-container'>
                        <div className='section-title'>
                            <h3 className='title'>Chuyên khoa phổ biến</h3>
                            <button className='btn-info'>Xem thêm</button>
                        </div>
                        <div className='section-content'>
                        <Slider {...this.props.settings}>
                        <div className='section-body'>
                            <img src={specialtyImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ xương khớp 1</div>
                        </div>
                        <div className='section-body'>
                            <img src={specialtyImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ xương khớp 2</div>
                        </div>
                        <div className='section-body'>
                            <img src={specialtyImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ xương khớp 3</div>
                        </div>
                        <div className='section-body'>
                            <img src={specialtyImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ xương khớp 4</div>
                        </div>
                        <div className='section-body'>
                            <img src={specialtyImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ xương khớp 5</div>
                        </div>
                        <div className='section-body'>
                            <img src={specialtyImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cơ xương khớp 6</div>
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
