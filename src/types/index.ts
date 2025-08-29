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

export type Video = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  video_url: string;
  created_at?: string;
};

export type Comment = {
  id: string;
  video_id: string;
  user_id: string;
  content: string;
  created_at?: string;
};
