"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  currentPage?: number;
  totalPages?: number;
  type?: "notes" | "trash";
};

export default function NotesPagination({
  currentPage = 1,
  totalPages = 1,
  type = "notes",
}: Props) {
  if (currentPage === 1 && totalPages === 1) {
    return null;
  }

  const isThereAPreviousPage = currentPage > 1;
  const isThereANextPage = totalPages > currentPage;

  const path = type === "notes" ? "/notes" : "/notes/trash";

  const prevPageHref = `${path}?page=${currentPage - 1}`;
  const nextPageHref = `${path}?page=${currentPage + 1}`;

  return (
    <Pagination>
      <PaginationContent>
        {isThereAPreviousPage && (
          <>
            <PaginationItem>
              <PaginationPrevious href={prevPageHref} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={prevPageHref}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem className="pointer-events-none opacity-50">
          <PaginationLink href="#">{currentPage}</PaginationLink>
        </PaginationItem>
        {totalPages && totalPages > currentPage + 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {isThereANextPage && (
          <>
            <PaginationItem>
              <PaginationLink href={nextPageHref}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={nextPageHref} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
