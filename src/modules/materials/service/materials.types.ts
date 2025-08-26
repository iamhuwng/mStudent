// @module:materials @layer:service @owner:studio

export type MaterialFormat = 'quiz' | 'video' | 'document' | 'slide';

export type Material = {
  id: string;
  name: string;
  format: MaterialFormat;
  tags: string[];
  timeLimit?: number; // in minutes
  content: string; // For now, a stub. Could be JSON, markdown, etc.
};
