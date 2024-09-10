import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';

import _ from "lodash";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        console.log("userInfo = ", userInfo)
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                console.log("Vai trò quản trị");
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                console.log("Vai trò bác sĩ");
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                
                <div className="languages">
                    <span className="welcome"><FormattedMessage id="homeheader.welcome" /> {userInfo && userInfo.firstName ? userInfo.firstName : ""}!</span>
                    <span className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    <span className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </span>
                </div>

                {/* nút logout */}
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
