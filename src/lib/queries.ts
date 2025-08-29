'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type {
  Video,
  Comment,
  CreateVideoRequest,
  EditVideoRequest,
  CreateCommentRequest,
} from '@/types';

// READS
export function useVideos(user_id: string) {
  return useQuery<Video[]>({
    queryKey: ['videos', user_id],
    queryFn: async () => {
      const { videos } = await api.listVideosByUser(user_id);
      return videos;
    },
    enabled: !!user_id,
  });
}

export function useVideo(video_id: string) {
  return useQuery<Video>({
    queryKey: ['video', video_id],
    queryFn: async () => {
      const { video } = await api.getVideo(video_id);
      return video;
    },
    enabled: !!video_id,
  });
}

export function useComments(video_id: string) {
  return useQuery<Comment[]>({
    queryKey: ['comments', video_id],
    queryFn: async () => {
      const { comments } = await api.listComments(video_id);
      return comments;
    },
    enabled: !!video_id,
  });
}

// WRITES
export function useCreateVideo(user_id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateVideoRequest) => api.createVideo(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['videos', user_id] });
    },
  });
}

export function useEditVideo() {
  return useMutation({
    mutationFn: (body: EditVideoRequest) => api.editVideo(body),
  });
}

export function useCreateComment(video_id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<CreateCommentRequest, 'video_id'>) =>
      api.createComment({ video_id, ...body }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments', video_id] });
    },
  });
}
