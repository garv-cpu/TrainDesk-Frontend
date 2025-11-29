export default function PageSkeleton() {
  return (
    <div className="p-10 animate-pulse space-y-4">
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
      <div className="h-4 w-full bg-gray-200 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
    </div>
  );
}
