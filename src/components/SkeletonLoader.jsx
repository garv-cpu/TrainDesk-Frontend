// components/SkeletonLoader.jsx
export default function SkeletonLoader({ height = "h-6", width = "w-full" }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${height} ${width}`}></div>
  );
}
