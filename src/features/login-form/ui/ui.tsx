import { useRef } from 'react';
import { useAppDispatch } from '../../../shared/lib';
import { login } from '../../../entities/user/model/action';
import { AuthData } from '../../../entities/user/model/types';

export default function LoginForm() {
  const formRef = useRef<HTMLFormElement|null>(null);
  const dispatch = useAppDispatch();
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(formRef && formRef.current){
      const formData = new FormData(formRef.current);
      const authData = Object.fromEntries(formData) as AuthData;
      dispatch(login(
        authData
      ));
    }
  };
  return (
    <form className="login__form form" action="#" method="post" ref={formRef} onSubmit={handleFormSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          data-testid = 'email_input'
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          data-testid = 'password_input'
          className="login__input form__input"
          type="password"
          name="password"
          pattern="^(?=.*[a-zA-Z])(?=.*\d).+$"
          placeholder="Password"
          required
        />
      </div>
      <button data-testid="login-btn" className="login__submit form__submit button" type="submit">
            Sign in
      </button>
    </form>
  );
}
