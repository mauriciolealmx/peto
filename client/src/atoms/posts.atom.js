import { atom } from 'recoil';

const postsState = atom({
  key: 'postsState',
  default: [],
});

export default postsState;