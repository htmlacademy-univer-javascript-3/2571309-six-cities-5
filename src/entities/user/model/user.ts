import { createReducer } from '@reduxjs/toolkit';
import { AuthEnum, IInitialStateUserState } from './types';
import { changeAuthStatus, setUser } from './action';

const initialState: IInitialStateUserState = {
  authorizationStatus: AuthEnum.UNKNOWN,
  user: null
};


export const userReducer = createReducer(initialState, (builder)=>{
  builder.addCase(changeAuthStatus,(state,{payload})=> {
    state.authorizationStatus = payload;
  }).addCase(setUser,(state,{payload})=> {
    state.user = payload;
  });
});


