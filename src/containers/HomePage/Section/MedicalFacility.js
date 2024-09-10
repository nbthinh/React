import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from '../../../services/userService';

import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
        console.log("Hoi dan it channel check allClinic = ", res);
    }

    handleViewDetailClinic = (clinic) => {
        // alert("Việc thằng Lê Huy Vũ nó tạo nhánh gitlab để nó làm task của mình đủ cho thấy nó muốn tìm cách để mình bị nghỉ việc, vậy mà vẫn thơm thớp nói chuyện bình thường, tỏ ý nhiệt tình, đằng sau lưng thì đâm thọt người khác một vố thật đau");
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    render() {
        let {dataClinics} = this.state;
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                <div className="section-header">
                    <span className="title-section">Cơ sở y tế nổi bật</span>
                    <button className="btn-section">Tìm kiếm</button>
                </div>
                <div className="section-body">
                    <Slider {...this.props.settings}>
                        {dataClinics && dataClinics.length > 0 &&
                            dataClinics.map((item, index) => {
                                return (
                                    <div
                                        className="section-customize clinic-child" key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div 
                                            className="bg-image section-medical-facility"
                                            style={{backgroundImage: `url(${item.image})`}}
                                        ></div>
                                        <div className="clinic-name">{item.name}</div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
