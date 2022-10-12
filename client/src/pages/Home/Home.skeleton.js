import Skeleton from 'react-loading-skeleton';

const HomeSkeleton = () => {
  return Array.from(Array(9).keys()).map((idx) => (
    <Skeleton key={idx} className="skeleton" count={1} />
  ));
};

export default HomeSkeleton;
