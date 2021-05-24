import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import userImg from '../img/profile-user.png';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { getUserInfo } from '../store/actions';

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(getUserInfo()),
});

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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectStatus);
