import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // save to markdowns table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,
      
      // Save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: ""
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevStates, snapShot) {
    if (prevProps.allDoctors != this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allRequiredDoctorInfor !== this.state.allRequiredDoctorInfor) {
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC")
      console.log(">>> ", dataSelectPrice, dataSelectPayment, dataSelectProvince);
      if (
        dataSelectPrice.length > 0 && dataSelectPrice.length > 0 && dataSelectProvince.length > 0
        && this.state.listPrice.length === 0 && this.state.listPayment.length === 0 && this.state.listProvince.length === 0
      ) {
        this.setState({
          listPrice: dataSelectPrice,
          listPayment: dataSelectPayment,
          listProvince: dataSelectProvince,
          listSpecialty: dataSelectSpecialty,
          listClinic: dataSelectClinic
        })
      }
    }
    
    if (prevProps.language != this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
          listPayment: dataSelectPayment,
          listProvince: dataSelectProvince
      });
    }
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let valueVi = `${item.lastName} ${item.firstName}`;
          let valueEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? valueVi : valueEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let valueVi = `${item.valueVi}`;
          let valueEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? valueVi : valueEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let valueVi = `${item.valueVi}`;
          let valueEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? valueVi : valueEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "CLINIC") {
        console.log("Thằng Lê Huy Vũ nó tạo nhánh riêng để nó làm cái task của mình đủ thấy là nó muốn khiến cho mình bị nghỉ việc, thằng Lê Huy Vũ thật độc ác = ", inputData);
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    console.log("this.state.selectedSpecialty = ", this.state.selectedSpecialty);
    this.props.saveDetailDoctor({
      doctorId: this.state.selectedOption.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : null,
      specialtyId: this.state.selectedSpecialty.value
    });
    console.log("this.state = ", this.state);
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption, selectedOption)
    );
    let {listPayment, listPrice, listProvince, listSpecialty, listClinic} = this.state;

    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown != null) {
      let markDown = res.data.Markdown;
      let addressClinic = "", nameClinic = "", note="", paymentId = "", provinceId = "", specialtyId = "", priceId = "", clinicId = "";
      let selectedPayment = "", selectedPrice = "", selectedProvince = "", selectedSpecialty = "", selectedClinic = "";
      if(res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        priceId = res.data.Doctor_Infor.priceId;
        clinicId = res.data.Doctor_Infor.clinicId;
        // selectedPrice: "",
        // selectedPayment: "",
        // selectedProvince: "",
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId
        })
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId
        })
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId
        })
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId
        })
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId
        })
      }
      console.log("markDown = ", markDown.description);
      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkdown: markDown.contentMarkdown,
        description: markDown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: ""
      });
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = {...this.state};
    stateCopy[stateName] = selectedOption;
    this.setState({...stateCopy})
    console.log("hoi dan it channel check new select on change: ", selectedOption, stateName);
    console.log("-----------this.state------------- = ", this.state);
  }

  handleOnChangeText = (event, id) => {
    let stateCopy = {...this.state}
    stateCopy[id] = event.target.value
    this.setState({
      ...stateCopy
    });
  };


  render() {
    let {hasOldData, listPrice, listPayment, listProvince, listSpecialty, listClinic} = this.state;
    console.log("hoi dan it check state = ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
            />
          </div>
          <div className="content-right">
            <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
            <textarea
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'description')}
              value={this.state.description}
            >
              Hello world
            </textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.price" /></label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              name={"selectedPrice"}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPayment}
              placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
              name={"selectedPayment"}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.province" /></label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listProvince}
              placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
              name={"selectedProvince"}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
            <input className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
            <input className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.note" /></label>
            <input className="form-control"
              onChange={(event) => this.handleOnChangeText(event, 'note')}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listSpecialty}
              placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
              name={"selectedSpecialty"}
            />
          </div>
          <div className="col-4 form-group">
            <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listClinic}
              placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
              name={"selectedClinic"}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "350px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        
        <button
          className={hasOldData === true ? "save-content-doctor": "create-content-doctor"}
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? <span><FormattedMessage id="admin.manage-doctor.save" /></span> : <span><FormattedMessage id="admin.manage-doctor.add" /></span>}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
