import { Request, Response } from "express";
import { SelectQueryBuilder } from "typeorm";

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export async function paginate(queryBuilder: SelectQueryBuilder<any>, page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;

  const records = await queryBuilder.skip(offset).take(pageSize).getMany();
  const totalItems = await queryBuilder.getCount();

  const pages = Math.ceil(totalItems / pageSize);
  const currentPage = offset / pageSize + 1;
  const hasNext = currentPage < totalItems;
  const hasPrev = currentPage > 1;

  const paginationInfo: PaginationInfo = {
    currentPage: page,
    pageSize: pageSize,
    totalItems,
    pages,
    hasNext,
    hasPrev,
  };

  return { records, paginationInfo };
}