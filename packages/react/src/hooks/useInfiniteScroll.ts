// useInfiniteScroll: infinite scrolling with IntersectionObserver.

import { useEffect, useRef, useCallback, useState } from "react";

export interface UseInfiniteScrollOptions {
  /** Callback when the sentinel element is visible. */
  onLoadMore: () => void | Promise<void>;
  /** Whether there are more items to load. */
  hasMore: boolean;
  /** Whether currently loading. */
  isLoading?: boolean;
  /** Root margin for IntersectionObserver. @default "100px" */
  rootMargin?: string;
  /** Threshold for IntersectionObserver. @default 0 */
  threshold?: number;
  /** Whether the hook is enabled. @default true */
  enabled?: boolean;
}

export interface UseInfiniteScrollReturn {
  /** Ref to attach to the sentinel element at the bottom of the list. */
  sentinelRef: React.RefObject<HTMLDivElement>;
  /** Whether the sentinel is currently visible. */
  isIntersecting: boolean;
}

/**
 * Hook for implementing infinite scroll behavior.
 *
 * Uses IntersectionObserver to detect when a sentinel element
 * becomes visible and triggers loading more items.
 *
 * @example
 * const { sentinelRef } = useInfiniteScroll({
 *   onLoadMore: () => fetchNextPage(),
 *   hasMore: data.hasNextPage,
 *   isLoading: isFetching,
 * });
 *
 * return (
 *   <div>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <div ref={sentinelRef} /> {/* Invisible sentinel *\/}
 *     {isLoading && <Spinner />}
 *   </div>
 * );
 */
export function useInfiniteScroll(
  options: UseInfiniteScrollOptions
): UseInfiniteScrollReturn {
  const {
    onLoadMore,
    hasMore,
    isLoading = false,
    rootMargin = "100px",
    threshold = 0,
    enabled = true,
  } = options;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const onLoadMoreRef = useRef(onLoadMore);

  // Keep callback ref up to date
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMoreRef.current();
      }
    },
    [hasMore, isLoading]
  );

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin,
      threshold,
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [enabled, rootMargin, threshold, handleIntersect]);

  return {
    sentinelRef,
    isIntersecting,
  };
}
