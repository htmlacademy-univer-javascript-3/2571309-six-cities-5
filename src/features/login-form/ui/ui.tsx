import { useState } from 'react';
import { useAppDispatch } from '../../../shared/lib';
import { login } from '../../../entities/user/model/action';
import { AuthData } from '../../../entities/user/model/types';

export default function LoginForm() {
  const [formData, setFormData] = useState({} as AuthData);
  const dispatch = useAppDispatch();
  const onFormInputChanged = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData((prev)=>({...prev, [event.target.name]: event.target.value }));
  };
  const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(login(formData));
  };
  return (
    <form className="login__form form" action="#" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={onFormInputChanged}
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={onFormInputChanged}
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit" onClick={onSubmitHandler}>
            Sign in
      </button>
    </form>
  );
}
