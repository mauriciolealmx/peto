const getSearchParam = (name) => {
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);
  return searchParams.get(name);
};

export default getSearchParam;
