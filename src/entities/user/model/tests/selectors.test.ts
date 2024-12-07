import { authSelector, userSelector } from '../selectors';
import { AuthEnum } from '../types';

describe('User selectors',()=>{
  const authState = {
    authorizationStatus:AuthEnum.AUTHENTICATED,
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    }
  };
  it('should return AuthEnum.AUTHENTICATED',()=>{
    const expectedRes = AuthEnum.AUTHENTICATED;

    const calculateRes = authSelector({user: authState});

    expect(calculateRes).toBe(expectedRes);
  });
  it('should return user from authState',()=>{
    const expectedRes = {...authState.user};

    const calculateRes = userSelector({user: authState});

    expect(calculateRes).toEqual(expectedRes);
  });
});
