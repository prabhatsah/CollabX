'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Camera, Send, X, Heart, MessageCircle, Share } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  images?: string[];
  timestamp: Date;
  likes: number;
  replies: number;
}

const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      initials: 'SJ',
    },
    content:
      'This is such an amazing project! The attention to detail in the UI design is incredible.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 12,
    replies: 3,
  },
  {
    id: '2',
    user: {
      name: 'Michael Chen',
      avatar:
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      initials: 'MC',
    },
    content: 'Great work on the implementation! Here are some screenshots:',
    images: [
      'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    ],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 8,
    replies: 1,
  },
  {
    id: '3',
    user: {
      name: 'Emily Rodriguez',
      avatar:
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      initials: 'ER',
    },
    content:
      'The dark theme looks fantastic! Could you share more details about the color palette?',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 15,
    replies: 5,
  },
];

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImages((prev) => [...prev, imageUrl]);
        setImageFiles((prev) => [...prev, file]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!newComment.trim() && selectedImages.length === 0) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        avatar:
          'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        initials: 'YU',
      },
      content: newComment,
      images: selectedImages.length > 0 ? selectedImages : undefined,
      timestamp: new Date(),
      likes: 0,
      replies: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setSelectedImages([]);
    setImageFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment,
      ),
    );
  };

  return (
    <div className="flex flex-col justify-between h-[79vh]">
      <div className="space-y-4 max-h-[70%] overflow-y-auto">
        {/* Existing Comments */}
        <div className="space-y-3">
          {comments.map((comment) => (
            <Card key={comment.id} className="border-none pt-4 pb-0 ">
              <CardContent className="px-4 ">
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      {comment.user.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white text-sm">
                        {comment.user.name}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(comment.timestamp)}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-2">
                      {comment.content}
                    </p>

                    {comment.images && comment.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-3 max-w-sm">
                        {comment.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Comment attachment ${index + 1}`}
                            className="w-full h-20 object-cover rounded border border-gray-600 cursor-pointer transition-transform hover:scale-105"
                          />
                        ))}
                      </div>
                    )}

                    {/* <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(comment.id)}
                        className={cn(
                          'text-gray-400 hover:text-red-400 h-7 px-2 text-xs',
                          comment.likes > 0 && 'text-red-400',
                        )}
                      >
                        <Heart className="w-3 h-3 mr-1" />
                        {comment.likes}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-blue-400 h-7 px-2 text-xs"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {comment.replies}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-green-400 h-7 px-2 text-xs"
                      >
                        <Share className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Comment Input - Moved to Bottom */}
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" />
          <AvatarFallback className="bg-blue-600 text-white text-xs">
            YU
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {/* Selected Images Preview */}
          {selectedImages.length > 0 && (
            <div className=" flex flex-wrap gap-2 mb-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Selected ${index + 1}`}
                    className="w-16 h-16 object-cover rounded border border-gray-600"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full p-0"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-2 h-2" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="relative">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none min-h-[80px] pr-20 text-sm"
            />

            {/* Controls inside textarea */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-white hover:bg-gray-600 h-7 w-7 p-0"
              >
                <Camera className="w-3 h-3" />
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!newComment.trim() && selectedImages.length === 0}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-3 text-xs"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
