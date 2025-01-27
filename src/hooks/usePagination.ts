import { useEffect, useState } from 'react';

export const usePagination = <T>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  const jump = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, maxPage));
  };

  useEffect(() => {
    if (maxPage && currentPage > maxPage) {
      jump(maxPage);
    }
  }, [currentPage, maxPage]);

  return { jump, currentData, currentPage, maxPage };
};
