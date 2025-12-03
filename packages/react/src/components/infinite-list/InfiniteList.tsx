// InfiniteList: infinite scrolling list component.

import { useRef, useEffect } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export interface InfiniteListProps<T> {
  /** Items to display. */
  items: T[];
  /** Render function for each item. */
  renderItem: (item: T, index: number) => unknown;
  /** Called when reaching the end to load more. */
  onLoadMore: () => void;
  /** Whether more items are available. */
  hasMore: boolean;
  /** Whether currently loading. */
  isLoading?: boolean;
  /** Loading indicator. */
  loader?: unknown;
  /** End of list message. */
  endMessage?: unknown;
  /** Additional CSS class. */
  className?: string;
}

export function InfiniteList<T>({
  items,
  renderItem,
  onLoadMore,
  hasMore,
  isLoading = false,
  loader,
  endMessage,
  className = "",
}: InfiniteListProps<T>) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { isIntersecting } = useInfiniteScroll(loadMoreRef, {
    threshold: 0.1,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, isLoading, onLoadMore]);

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
      
      <div ref={loadMoreRef}>
        {isLoading && (loader || <InfiniteListLoader />)}
        {!hasMore && !isLoading && endMessage}
      </div>
    </div>
  );
}

// Loader component
export interface InfiniteListLoaderProps {
  className?: string;
}

export function InfiniteListLoader({ className = "" }: InfiniteListLoaderProps) {
  return (
    <div className={`flex justify-center py-4 ${className}`}>
      <div className="animate-spin h-6 w-6 border-2 border-blue-600 rounded-full border-t-transparent" />
    </div>
  );
}

// End component
export interface InfiniteListEndProps {
  children?: unknown;
  className?: string;
}

export function InfiniteListEnd({ children, className = "" }: InfiniteListEndProps) {
  return (
    <div className={`text-center py-4 text-gray-500 text-sm ${className}`}>
      {children || "No more items"}
    </div>
  );
}

// Item wrapper
export interface InfiniteListItemProps {
  children?: unknown;
  className?: string;
}

export function InfiniteListItem({ children, className = "" }: InfiniteListItemProps) {
  return <div className={className}>{children}</div>;
}
