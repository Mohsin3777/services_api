export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
}

export function parsePagination(query: any): Required<PaginationQuery> & { offset: number } {
  const rawPage = parseInt(query.page as any) || 1;
  const rawLimit = Math.min(100, Math.max(1, parseInt(query.limit as any) || 10));
  const sortBy = (query.sortBy as string) || "id";
  const order = (query.order as "ASC" | "DESC") || "ASC";
  const page = Math.max(1, rawPage);
  const limit = rawLimit;
  const offset = (page - 1) * limit;
  return { page, limit, sortBy, order, offset };
}

export function buildPaginationResponse(data: any[], page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages
    }
  };
}
