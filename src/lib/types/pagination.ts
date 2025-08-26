// @module:platform-core @layer:service @owner:studio

// >>> BEGIN gen:core.types.pagination (layer:service)
export type Page<T> = {
  items: T[];
  nextCursor?: string | null;
  hasMore: boolean;
};
// <<< END gen:core.types.pagination
