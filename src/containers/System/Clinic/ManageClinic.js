import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
    }
  }

  async componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  

  handleOnchangeInput = (event, id) => {
    let copyState = {...this.state};
    copyState[id] = event.target.value;
    this.setState({...copyState})
  }


  handleEditorChange = ({ html, text }) => {
    this.setState({
        descriptionMarkdown: text,
        descriptionHTML: html,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };


  handleSaveNewClinic = async() => {
    console.log(">>> hỏi dân it check state = ", this.state);
    let res = await createNewClinic(this.state);
    console.log("res = ", res);
    if (res && res.errCode === 0) {
      toast.success("Create new clinic success")
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: ""
      })
    }
    else {
      toast.error("Create new clinic error")
    }
  }
  
  render() {
    return (
        <div className="manage-specialty-container">
            <div className="ms-title">Quản lý phòng khám</div>
            <div className="add-new-specialty row">
                <div className="col-6 form-group">
                    <label>Tên phòng khám</label>
                    <input className="form-control" type="text"
                        value={this.state.name}
                        onChange={(event) => this.handleOnchangeInput(event, "name")}
                    />
                </div>
                <div className="col-6 form-group">
                    <label>Ảnh phòng khám</label>
                    <input
                        className="form-control-file" type="file"
                        onChange={(event) => this.handleOnchangeImage(event)}
                    />
                </div>
                <div className="col-12 form-group">
                  <label>Địa chỉ phòng khám</label>
                  <input className="form-control" type="text"
                        value={this.state.address}
                        onChange={(event) => this.handleOnchangeInput(event, "address")}
                    />
                </div>
                <div className="col-12">

                    <MdEditor
                        style={{ height: "350px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                <div className="col-12">
                    <button
                        className="btn-save-specialty"
                        onClick={() => this.handleSaveNewClinic()}
                    >Save</button>
                </div>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
