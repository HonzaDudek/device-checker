import { ICatalogFilter } from "../../Components/Organisms/CatalogFilter/CatalogFilter";

// Creates query for filter from given values
export const buildFilter = (filter: ICatalogFilter) => {
  let query = {};
  for (let keys in filter) {
    // @ts-ignore
    if (filter[keys] !== undefined && filter[keys]?.length > 0) {
      // @ts-ignore
      query[keys] = filter[keys];
    }
  }
  if (filter.isAvailable) {
    query = { ...query, borrowed: filter.isAvailable };
  }
  return query;
};

// Compares query with form data provided, it checks
// if keys in query and form matches and returns comparison result
export const filterData = (data: any, query: any) => {
  return data.filter((item: any) => {
    for (let key in query) {
      if (key === "borrowed" && item[key] !== undefined) {
        return true;
      } else {
        if (
          item[key] === undefined ||
          !item[key].toLowerCase().includes(query[key].toLowerCase())
        ) {
          return false;
        }
      }
    }
    return true;
  });
};
