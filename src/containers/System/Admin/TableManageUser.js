import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userRedux: []
    };
  }
  
  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevStates, snapShot) {
    if (prevProps.listUsers !== this.props.listUsers) {
        this.setState({
            userRedux: this.props.listUsers
        })
    }

  }

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
  }

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
  }

  render() {
    // console.log("[TABLE MANAGE USER] this.props.listUsers = ", this.props.listUsers);
    // console.log("[CHECK] this.state.userRedux = ", this.state.userRedux);
    let arrUsers = this.state.userRedux;
    console.log("arrUsers = ", arrUsers);
    return (
      <>
        <table id="TableManageUser">
            <tbody>
                <tr>
                    <th>Email</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.email}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.address}</td>
                            <td>
                                <button
                                  className="btn-edit"
                                  onClick={() => this.handleEditUser(item)}
                                >
                                  <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                  <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    )
                })}
               

            </tbody>
        </table>
        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (userId) => dispatch(actions.deleteAUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
