import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";

import {getScheduleDoctorByDate} from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {}
    }
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getArrDays = async (language) => {
    let allDays = [];
    for(let i = 0; i < 7; i++) {
      let object = [];
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Hôm nay - ${ddMM}`
          object.label = today;
        }
        else {
          let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      }
      else {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Today - ${ddMM}`
          object.label = today;
        }
        else {
          object.label = moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object)
    }
    
    // this.setState({
    //   allDays: allDays
    // })
    return allDays;
  }

  async componentDidMount() {
    let {language} = this.props;

    let allDays = await this.getArrDays(language);
    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
        this.setState({
          allAvailableTime: res.data ? res.data : []
      })
    }
    if (allDays && allDays.length > 0) {
      this.setState({
        allDays: allDays,
      })
    }
  }

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
      let {language} = this.props;

      let allDays = await this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays
      })
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = await this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
      this.setState({
        allAvailableTime: res.data ? res.data : []
      })

    }
  }

  handleOnchangeSelect = async (event) => {
    console.log("this.props.match.params = ", this.props.doctorIdFromParent);
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let id = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(id, date);
      let allTime = [];
      console.log("res = ", res);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : []
        })
      }
    }
    console.log("Handle onchange select = ", event.target.value);
  }
  

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time
    })
    console.log("Hoidanit channel: time: ", time);
  }

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false
    })
  }
  
  render() {
    let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
    let {language} = this.props;
    return (

      <>
      
        <div className="doctor-schedule-container">
            <div className="all-schedule">
              <select onChange={(event) => this.handleOnchangeSelect(event)}>
                {allDays && allDays.length > 0 &&
                  allDays.map((item, index) => {
                    return (
                      <option key={index} value={item.value}>{ item.label }</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="all-available-time">
                <div className="text-calendar">
                  <i className="fas fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                </div>
                <div className="time-content">
                  { allAvailableTime && allAvailableTime.length > 0 ?
                    <>
                      <div className="time-content-btns">
                        {allAvailableTime.map((item, index) => {
                          // let timeDisplay = "";
                          // if (item && item.timeTypeData && item.timeTypeData.valueVi && item.timeTypeData.valueEn) {
                          //   timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                          // }
                          let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                          return (
                            <button
                              key={index}
                              className={language === LANGUAGES.VI ? "btn-vi"  : "btn-en"}
                              onClick={() => this.handleClickScheduleTime(item)}
                            >
                              {timeDisplay}
                            </button>
                          )
                        })
                        }
                      </div>
                      <div className="book-free">
                        <span>
                          <FormattedMessage id="patient.detail-doctor.choose" />
                          <i className="far fa-hand-point-up"></i>
                          <FormattedMessage id="patient.detail-doctor.book-free" />
                        </span>
                      </div>
                    </>
                    :
                    <div className="no-schedule"><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                  }
                </div>
            </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
