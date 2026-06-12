export default function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-emerald rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-3 h-3 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded flex-1" />
          <div className="h-10 bg-gray-200 rounded flex-1" />
        </div>
      </div>
    </div>
  );
}