import { createReducer } from '@reduxjs/toolkit';
import { AuthEnum, IInitialStateUserState } from './types';
import { changeAuthStatus } from './action';

const initialState: IInitialStateUserState = {
  authorizationStatus: AuthEnum.UNKNOWN
};


export const userReducer = createReducer(initialState, (builder)=>{
  builder.addCase(changeAuthStatus,(state,{payload})=> {
    state.authorizationStatus = payload;
  });
});


