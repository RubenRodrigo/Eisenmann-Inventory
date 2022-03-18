import { axiosInstanceServerSide } from "@/helpers/axiosInstance";
import { ProductStockBase, ProductStockBaseEdit } from "@/interfaces/ProductStock";

interface Props {
  token: string;
}

interface GetProductStockListProps extends Props {
  queryParams?: string;
}
export const getProductStockList = async ({ token, queryParams }: GetProductStockListProps) => {
  return await axiosInstanceServerSide(token).get(
    '/product/product_stock/?' + (queryParams !== undefined ? queryParams : '')
  )
}

export const getProductStockListAll = async ({ token, queryParams }: GetProductStockListProps) => {
  return await axiosInstanceServerSide(token).get(
    '/product/product_stock_list/?' + (queryParams !== undefined ? queryParams : '')
  )
}

interface GetProductStockProps extends Props {
  id: number;
}

export const getProductStock = async ({ token, id }: GetProductStockProps) => {
  return await axiosInstanceServerSide(token).get('/product/product_stock/' + id)
}

interface CreateProductStockProps extends Props {
  productStock: ProductStockBase
}

export const createProductStock = async ({ token, productStock }: CreateProductStockProps) => {
  return await axiosInstanceServerSide(token).post('/product/product_stock/', {
    ...productStock
  })
}

interface EditProductStockProps extends Props {
  id: number;
  productStock: ProductStockBaseEdit;
}

export const editProductStock = async ({ token, id, productStock }: EditProductStockProps) => {
  return await axiosInstanceServerSide(token).patch(`/product/product_stock/${id}/`, {
    ...productStock
  })
}

interface EditProductRealStockProps extends Props {
  id: number;
  realStock: number;
}

export const editProductRealStock = async ({ token, id, realStock }: EditProductRealStockProps) => {
  return await axiosInstanceServerSide(token).patch(`/product/product_stock/${id}/`, {
    real_stock: realStock
  })
}

interface DeleteProductStockProps extends Props {
  id: number;
}

export const deleteProductStock = async ({ token, id }: DeleteProductStockProps) => {
  return await axiosInstanceServerSide(token).delete(`/product/product_stock/${id}/`)
}


interface createProductStockByRealProps extends Props {
  id: number;
}

export const createProductStockByReal = async ({ token, id }: createProductStockByRealProps) => {
  return await axiosInstanceServerSide(token).post('/product/product_stock/set_real_stock/', {
    product_stock: id
  })
}