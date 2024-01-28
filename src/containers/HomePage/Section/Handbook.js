import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./Handbook.scss";
import Slider from "react-slick";
// ReactJS\node_modules\slick-carousel\slick
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import handbookImg from "../../../../src/assets/images/Handbook/tam-soat-benh-doctor-check.png"
class Handbook extends Component {
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
                <div className='section-handbook'>             
                    <div className='section-container'>
                        <div className='section-title'>
                            <h3 className='title'>Cẩm nang</h3>
                            <button className='btn-info'>Xem thêm</button>
                        </div>
                        <div className='section-content'>
                        <Slider {...this.props.settings}>
                        <div className='section-body'>
                            <img src={handbookImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cẩm nang 1</div>
                        </div>
                        <div className='section-body'>
                            <img src={handbookImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cẩm nang 2</div>
                        </div>
                        <div className='section-body'>
                            <img src={handbookImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cẩm nang 3</div>
                        </div>
                        <div className='section-body'>
                            <img src={handbookImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cẩm nang 4</div>
                        </div>
                        <div className='section-body'>
                            <img src={handbookImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cẩm nang  5</div>
                        </div>
                        <div className='section-body'>
                            <img src={handbookImg} className='img-thumbnail-body'/>
                            <div className='section-body-title'>Cẩm nang  6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);