import PropTypes from 'prop-types';

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);

Skeleton.propTypes = {
  className: PropTypes.string,
};

export const ProductCardSkeleton = () => (
  <div className="bg-white">
    <Skeleton className="w-full aspect-square mb-4" />
    <div className="p-4">
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

export const CategoryCardSkeleton = () => (
  <Skeleton className="w-full aspect-[3/4] rounded-2xl" />
);

export default Skeleton;
