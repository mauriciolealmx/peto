const PLACEHOLDER_IMG = 'https://via.placeholder.com/150';

const getDevImage = () => {
  return JSON.parse(localStorage.getItem('dev-images'))
    ? PLACEHOLDER_IMG
    : false;
};

export default getDevImage;
