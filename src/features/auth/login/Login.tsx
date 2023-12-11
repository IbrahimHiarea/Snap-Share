import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../../app/store';
import { login, userType } from '../auth.slice'

import Loader from '../../../components/Loader/Loader';
import Input from '../../../components/Input/Input';
import SubmitButton from '../../../components/SubmitButton/SubmitButton';

import Select from 'react-select';
import style from './Login.module.css';

function Login() {

  const dispatch = AppDispatch();
  const nav = useNavigate();

  const hintEmail = [
    {
      value: "michael.lawson@reqres.in",
      label: "michael.lawson@reqres.in"
    },
    {
      value: "lindsay.ferguson@reqres.in",
      label: "lindsay.ferguson@reqres.in"

    },
    {
      value: "tobias.funke@reqres.in",
      label: "tobias.funke@reqres.in"

    },
    {
      value: "byron.fields@reqres.in",
      label: "byron.fields@reqres.in"

    },
    {
      value: "george.edwards@reqres.in",
      label: "george.edwards@reqres.in"

    },
    {
      value: "rachel.howell@reqres.in",
      label: "rachel.howell@reqres.in"
    },
    {
      value: "eve.holt@reqres.in",
      label: "eve.holt@reqres.in"
    }
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<userType>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError('');
    e.preventDefault();    
    try {
      const response = await dispatch(login(user)).unwrap();
      localStorage.setItem("token",response.token);
      localStorage.setItem("id",response.id);
      nav('/home');
    } catch (error) {
      console.log(error);
      setError("Wrong Email !");
    }
    setLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((pre) => ({...pre, [e.target.name]: e.target.value}));
  }

  if(loading){
    return <div className={style.login}>
      <div className={style.loader}>
        <Loader />
      </div>
    </div>
  }

  return (
    <div className={style.login}>
      <h1>Welcome To SnapShare</h1>
      <form onSubmit={handleSubmit} className={style['login-form']}>
        <Select 
          className={style.email}
          options={hintEmail}
          defaultValue={hintEmail[0]}
          name="email"
          onChange={(e) => setUser((pre) => ({...pre, email: e?.value}))}
        />
        <Input 
          name='password'
          placeHolder='Enter ANY Password You Want'
          type='password'
          onChange={handleChange}
          componentStyle={{
            width: '250px',
            height: '40px',
            border: '2px solid var(--primary-main)',
            borderRadius: '9px'
          }}
        />
        {
          error !== ''  &&
          <div className={style.error}>{error}</div>
        }
        <SubmitButton
          name='submitButton'
          value='Login'
          componentStyle={{
            width: '100px',
            height: '40px',
            borderRadius: '9px',
            border: 'none',
            backgroundColor: 'var(--secondary-main)',
            color: 'white'
          }}
        />
      </form>
    </div>
  )
}

export default Login