import type {
  CreateVideoRequest,
  EditVideoRequest,
  CreateCommentRequest,
  ListVideosResponse,
  GetVideoResponse,
  ListCommentsResponse,
  CreateVideoResponse,
  EditVideoResponse,
  CreateCommentResponse,
} from '@/types';

const BASE = process.env.NEXT_PUBLIC_API_URL!;
if (!BASE) throw new Error('Missing NEXT_PUBLIC_API_URL');

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return (await res.json()) as T;
}

export const api = {
  listVideosByUser(user_id: string): Promise<ListVideosResponse> {
    return http(`/videos?user_id=${encodeURIComponent(user_id)}`);
  },
  getVideo(video_id: string): Promise<GetVideoResponse> {
    return http(`/videos/single?video_id=${encodeURIComponent(video_id)}`);
  },
  createVideo(body: CreateVideoRequest): Promise<CreateVideoResponse> {
    return http('/videos', { method: 'POST', body: JSON.stringify(body) });
  },
  editVideo(body: EditVideoRequest): Promise<EditVideoResponse> {
    return http('/videos', { method: 'PUT', body: JSON.stringify(body) });
  },
  listComments(video_id: string): Promise<ListCommentsResponse> {
    return http(`/videos/comments?video_id=${encodeURIComponent(video_id)}`);
  },
  createComment(body: CreateCommentRequest): Promise<CreateCommentResponse> {
    return http('/videos/comments', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
};
