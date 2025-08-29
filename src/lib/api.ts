import {
  CreateVideoRequest,
  EditVideoRequest,
  CreateCommentRequest,
} from '@/src/types';

const BASE = process.env.NEXT_PUBLIC_API_URL!;

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  try {
    return (await res.json()) as T;
  } catch {
    return (await res.text()) as unknown as T;
  }
}

export const api = {
  createVideo: (body: CreateVideoRequest) =>
    http<string>('/videos', { method: 'POST', body: JSON.stringify(body) }),

  listVideosByUser: (user_id: string) =>
    http<string>(`/videos?user_id=${encodeURIComponent(user_id)}`),

  getVideo: (video_id: string) =>
    http<string>(`/videos/single?video_id=${encodeURIComponent(video_id)}`),

  editVideo: (body: EditVideoRequest) =>
    http<string>('/videos', { method: 'PUT', body: JSON.stringify(body) }),

  createComment: (body: CreateCommentRequest) =>
    http<string>('/videos/comments', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  listComments: (video_id: string) =>
    http<string>(`/videos/comments?video_id=${encodeURIComponent(video_id)}`),
};
