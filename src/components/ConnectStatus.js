import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import userImg from '../img/profile-user.png';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import actions from '../store/actions';

const ConnectStatus = ({ userInfo, getUserInfo }) => {
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="connectstatus">
      <Link to="/profil">
        <div className="connecteduser-container" href="/profile">
          <div>{userInfo.name}</div>
          <img src={userImg} alt="" />
        </div>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch({ type: actions.GET_USER_INFO }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectStatus);
