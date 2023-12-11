import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, AppSelector } from '../../app/store';
import { fetchProfiles, fetchPosts } from './home.slice';

import Navbar from '../../components/Navbar/Navbar';
import Loader from '../../components/Loader/Loader';

import { FaHeart } from "react-icons/fa";
import { LiaComments } from "react-icons/lia";

import style from './Home.module.css';

function Home() {

  const dispatch = AppDispatch();
  const nav = useNavigate();

  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const posts = AppSelector((state) => state.home.data.posts);
  const profiles = AppSelector((state) => state.home.data.profiles);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        await dispatch(fetchPosts()).unwrap();
        await dispatch(fetchProfiles()).unwrap();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetch();
  },[]);

  if(loading){
    return <div className={style.home}>
      <div className={style.loader}>
        <Loader />
      </div>
    </div>
  }

  return (
    <div className={style.home}>
      <Navbar
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className={style.main}>
        <div className={style.posts}>
          {
            posts.filter((post) => {
              return post.title!.toLowerCase().includes(search.toLowerCase())   ||
                    post.email!.toLowerCase().includes(search.toLowerCase())    || 
                    post.username!.toLowerCase().includes(search.toLowerCase());
            })
            .map((post,index) => {
              return <div className={style.post} key={index}>
                <div className={style["first-section"]}>
                  <img src={post.avatar} alt="user image"/>
                  <div className={style.info}>
                    <div className={style.username}>{post.username}</div>
                    <div className={style.email}>{post.email}</div>
                  </div>
                </div>
                <div className={style["second-section"]}>
                  <div className={style.title}>
                    {post.title}
                  </div>
                  <img src={post.postImage} alt="post image" />
                </div>
                <div className={style.footer}>
                  <div className={style.likes}>
                    <FaHeart size="20px" color='var(--primary-red)' />
                    <div>{(post.likes! >= 1000 ? Math.round(post.likes! / 1000) : post.likes)}{post.likes! >= 1000 ? 'K' : ''}</div>
                  </div>
                  <div className={style.comments}>
                    <LiaComments size="20px" color='var(--back-ground)' />
                    <div>{(post.comments! >= 1000 ? Math.round(post.comments! / 1000) : post.comments)}{post.comments! >= 1000 ? 'K' : ''}</div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
        <div className={style.users}>
          <h2>Profiles</h2>
          {
            profiles.map((user,index) => {
              return <div className={style.user} key={index} onClick={() => nav(`/profile/${user.id}`)}>
                <img src={user.image} alt="user image" />
                <div className={style.info}>
                  <div className={style.username}>{user.username}</div>
                  <div className={style.email}>{user.email}</div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Home;