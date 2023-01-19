import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { selectApiData } from "../../utils";

const getProducts = (filters) =>
  axios.post(`https://api.fmarket.vn/res/products/filter`, filters);

function useProductsQuery(filters, options = {} ) {
  return useQuery({
    queryKey: ['product', 'list', filters],
    queryFn: () => getProducts(filters),
    select: selectApiData,
    ...options
  });
}

export default useProductsQuery
