import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProfileInfo } from '../home.slice';
import { AppDispatch, AppSelector } from '../../../app/store';

import Loader from '../../../components/Loader/Loader';
import Navbar from '../../../components/Navbar/Navbar';

import style from './Profile.module.css';

function Profile() {

  const dispatch = AppDispatch();

  const { id } = useParams();
  const profileId: number = +id!;
  const [loading ,setLoading] = useState(true);
  const profileInfo = AppSelector((state) => state.home.data.profileInfo);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        await dispatch(fetchProfileInfo(profileId)).unwrap();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetch();
  },[])

  if(loading){
    return <div className={style.profiles}>
      <div className={style.loader}>
        <Loader />
      </div>
    </div>
  }

  return (
    <div className={style.profiles}>
      <Navbar />
      <div className={style.info}>
        <div className={style.container}>
          <div className={style["first-section"]}>
            <img src={profileInfo.image} alt="user image" />
            <div className={style.username}>{profileInfo.username}</div>
          </div>
          <div className={style["second-section"]}>
            <div className={style.field}>
              <div className={style.label}>First Name</div>
              <input type="text" disabled value={profileInfo.firstName} />
            </div>
            <div className={style.field}>
              <div className={style.label}>Last Name</div>
              <input type="text" disabled value={profileInfo.lastName} />
            </div>
            <div className={style.field}>
              <div className={style.label}>Email</div>
              <input type="text" disabled value={profileInfo.email} />
            </div>
            <div className={style.field}>
              <div className={style.label}>Address</div>
              <input type="text" disabled value={profileInfo.address} />
            </div>
            <div className={style.field}>
              <div className={style.label}>Phone</div>
              <input type="text" disabled value={profileInfo.phone} />
            </div>
            <div className={style.field}>
              <div className={style.label}>Job</div>
              <input type="text" disabled value={profileInfo.job} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;