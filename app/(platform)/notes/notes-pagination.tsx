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
};

export default function NotesPagination({
  currentPage = 1,
  totalPages = 1,
}: Props) {
  if (currentPage === 1 && totalPages === 1) {
    return null;
  }

  const isThereAPreviousPage = currentPage > 1;
  const isThereANextPage = totalPages > currentPage;

  return (
    <Pagination>
      <PaginationContent>
        {isThereAPreviousPage && (
          <>
            <PaginationItem>
              <PaginationPrevious href={`/notes?page=${currentPage - 1}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`/notes?page=${currentPage - 1}`}>
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
              <PaginationLink href={`/notes?page=${currentPage + 1}`}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`/notes?page=${currentPage + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
