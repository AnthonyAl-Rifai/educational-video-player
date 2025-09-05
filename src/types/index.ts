// Models
export type Video = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string;
  created_at: string;
  num_comments: number;
};

export type Comment = {
  id: string;
  video_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

//Requests
export type CreateVideoRequest = {
  user_id: string;
  title: string;
  description: string;
  video_url: string;
};

export type EditVideoRequest = {
  video_id: string;
  title: string;
  description: string;
};

export type CreateCommentRequest = {
  video_id: string;
  content: string;
  user_id: string;
};

// Responses
export type ListVideosResponse = { videos: Video[] };
export type GetVideoResponse = { video: Video };
export type ListCommentsResponse = { comments: Comment[] };

export type CreateVideoResponse = { success: string }; // server returns success message
export type CreateCommentResponse = { success: string };
export type EditVideoResponse = { success: string };

// Video Player Types
export type PlaybackState = 'idle' | 'ready' | 'playing' | 'paused' | 'buffering';

// Filter Types
export type SortOption = 'date' | 'comments';
