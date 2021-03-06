import { getApi } from '../../../api';
import config from '../../../config';
import { makeURI } from '../../../utils/uri';

const createFilterOption = (title, value, count = 0, hasChildren = false) => ({
  title,
  value,
  count,
  hasChildren,
});

const reformatCategories = categories =>
  categories.reduce((previous, value) => {
    const hasChildren = value.children && value.children.length > 0;
    const filterOption = createFilterOption(value.name, value.id, value.count, hasChildren);
    filterOption.children = hasChildren ? reformatCategories(value.children) : null;

    previous.push(filterOption);
    return previous;
  }, []);

const countAllCategory = categories => categories.reduce((previous, value) => previous + value.count, 0);

export async function fetchPurchaseCategories() {
  const api = getApi();
  const response = await api.get(makeURI('/items/categories', {}, config.LIBRARY_API_BASE_URL));
  return {
    allCategoryCount: countAllCategory(response.data.categories),
    categories: [...reformatCategories(response.data.categories)],
  };
}

export async function fetchPurchaseServiceTypesCount(serviceType) {
  const api = getApi();
  const response = await api.get(makeURI('/items/main/count/', { service_type: serviceType }, config.LIBRARY_API_BASE_URL));
  return response.data;
}
