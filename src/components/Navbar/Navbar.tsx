import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSelector, AppDispatch } from '../../app/store';
import { userInfo } from '../../features/auth/auth.slice';
import Input from '../Input/Input';
import Button from '../Button/Button';

import { FaCameraRetro } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import style from './Navbar.module.css';

type NavbarProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void 
}

function Navbar( { onChange }: NavbarProps ) {

  const dispatch = AppDispatch();
  const nav = useNavigate();
  const state = AppSelector((state) => state.auth.data);
  
  useEffect(() => {
    const fetch = async () => {
      try {
        const userId: number = +localStorage.getItem('id')!;
        await dispatch(userInfo(userId)).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  },[])
  

  return (
    <div className={style.nav}>
      <div className={style.logo}>
        <div className={style.icon}>
          <FaCameraRetro size="30px" color="white"/>
        </div>
        <div className={style.title}>
          SnapShare
        </div>
      </div>
      <div className={style.search}>
        <div className={style["search-icon"]}>
          <CiSearch size="25px" color='var(--back-ground)'/>
        </div>
        <Input
          name='search'
          placeHolder='Search Now...'
          type='text'
          onChange={onChange}
          componentStyle={{
            width: '500px',
            height: '35px',
            backgroundColor: '#f8f8f8',
            borderRadius: '22px',
            border: '1px solid var(--back-ground)',
            paddingLeft: '30px',
            color: 'var(--back-ground)'
          }}
        />
      </div>
      <div className={style["user-info"]}>
        <div className={style.userName}>
          {state.firstName + ' ' + state.lastName}
        </div>
        <div className={style.img}>
          <img src={state.avatar} alt="User Image" />
        </div>
        <div className={style.logout}>
          <Button 
            onClick={() => {
              localStorage.clear();
              nav('/login');
            }}
            name="logout"
            value="Logout"
            componentStyle={{
              width: "80px",
              height: "30px",
              color: 'var(--primary-red)',
              backgroundColor: 'transparent',
              borderRadius: '7px',
              border: '1px solid var(--primary-red)',
              fontWeight: 'bold'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;