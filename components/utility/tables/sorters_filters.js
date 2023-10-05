// Sort Tables
export const transformData = (sortColumn, sortType, data, limit, page) => {
  const start = limit * (page - 1);
  const end = start + limit;

  let paginatedData = data.slice(start, end);

  if (sortColumn && sortType) {
    paginatedData = paginatedData.sort((a, b) => {
      let x = a[sortColumn];
      let y = b[sortColumn];
      if (typeof x === "string") {
        x = x.charCodeAt();
      }
      if (typeof y === "string") {
        y = y.charCodeAt();
      }
      if (sortType === "asc") {
        return x - y;
      } else {
        return y - x;
      }
    });
  }

  const filteredData = paginatedData.filter((v, i) => {
    return i >= start && i < end;
  });

  return filteredData;
};

export const handleSortColumn = (
  sortColumn,
  sortType,
  setLoading,
  setSortColumn,
  setSortType
) => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setSortColumn(sortColumn);
    setSortType(sortType);
  }, 500);
};
