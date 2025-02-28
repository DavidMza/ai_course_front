import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LikeButtonProps {
  liked: boolean;
  likes: number;
  onToggleLike: () => void;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  liked,
  likes,
  onToggleLike,
  className
}) => {
  return (
    <button
      onClick={onToggleLike}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors",
        liked
          ? "bg-pink-50 text-pink-500 hover:bg-pink-100"
          : "bg-gray-50 text-gray-500 hover:bg-gray-100",
        className
      )}
    >
      <Heart
        className={cn(
          "w-4 h-4",
          liked ? "fill-current" : "fill-none"
        )}
      />
      <span className="text-sm font-medium">{likes}</span>
    </button>
  );
}