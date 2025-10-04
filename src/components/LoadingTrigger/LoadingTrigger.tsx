// src/components/LoadingTrigger/LoadingTrigger.tsx
import React from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver/useIntersectionObserver";

interface LoadingTriggerProps {
  onLoad: () => void;
  loading: boolean;
  hasMore: boolean;
}

export const LoadingTrigger: React.FC<LoadingTriggerProps> = ({
  onLoad,
  loading,
  hasMore,
}) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  React.useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoad();
    }
  }, [isIntersecting, hasMore, loading, onLoad]);

  if (!hasMore) {
    return (
      <div className="text-center py-8 text-gray-500">
        Toutes les images ont été chargées
      </div>
    );
  }

  return (
    <div ref={targetRef} className="flex justify-center py-8">
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Chargement d'images...</span>
        </div>
      ) : (
        <div className="text-gray-400">
          Faites défiler pour charger plus d'images
        </div>
      )}
    </div>
  );
};
