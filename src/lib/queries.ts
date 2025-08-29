'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/src/lib/api';
import type {
  Video,
  Comment,
  CreateVideoRequest,
  EditVideoRequest,
  CreateCommentRequest,
} from '@/src/types';

// Helper to tolerate either raw JSON or JSON string responses
const as = <T>(x: unknown) => (typeof x === 'string' ? JSON.parse(x) : x) as T;

// READS
export const useVideos = (user_id: string) =>
  useQuery({
    queryKey: ['videos', user_id],
    queryFn: async () => as<Video[]>(await api.listVideosByUser(user_id)),
    enabled: !!user_id,
  });

export const useVideo = (video_id: string) =>
  useQuery({
    queryKey: ['video', video_id],
    queryFn: async () => as<Video>(await api.getVideo(video_id)),
    enabled: !!video_id,
  });

export const useComments = (video_id: string) =>
  useQuery({
    queryKey: ['comments', video_id],
    queryFn: async () => as<Comment[]>(await api.listComments(video_id)),
    enabled: !!video_id,
  });

// WRITES
export const useCreateVideo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateVideoRequest) => api.createVideo(body), // returns new id (string)
    onSuccess: (_id, vars) => {
      qc.invalidateQueries({ queryKey: ['videos', vars.user_id] });
    },
  });
};

export const useEditVideo = () =>
  useMutation({
    mutationFn: (body: EditVideoRequest) => api.editVideo(body),
  });

export const useCreateComment = (video_id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<CreateCommentRequest, 'video_id'>) =>
      api.createComment({ video_id, ...body }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments', video_id] });
    },
  });
};
