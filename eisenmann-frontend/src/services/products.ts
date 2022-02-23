import { axiosInstanceServerSide } from "@/helpers/axiosInstance";
import { ProductBase } from "@/interfaces/Product";

interface Props {
  token: string;
}

interface GetProductListProps extends Props {
  queryParams?: string;
}

export const getProductList = async ({ token, queryParams }: GetProductListProps) => {
  return await axiosInstanceServerSide(token).get(
    '/product/product/' + (queryParams !== undefined ? queryParams : '')
  )
}

export const getProductListAll = async ({ token }: Props) => {
  return await axiosInstanceServerSide(token).get('/product/product/list_all')
}

interface GetProductProps extends Props {
  id: string;
}

export const getProduct = async ({ token, id }: GetProductProps) => {
  return await axiosInstanceServerSide(token).get('/product/product/' + id)
}

interface CreateProductProps extends Props {
  product: ProductBase
}

export const createProduct = async ({ token, product }: CreateProductProps) => {
  return await axiosInstanceServerSide(token).post('/product/product/', {
    ...product
  })
}

interface EditProductProps extends CreateProductProps {
  id: number;
}

export const editProduct = async ({ token, id, product }: EditProductProps) => {
  return await axiosInstanceServerSide(token).put(`/product/product/${id}/`, {
    ...product
  })
}

interface DeleteProductProps extends Props {
  id: number;
}

export const deleteProduct = async ({ token, id }: DeleteProductProps) => {
  return await axiosInstanceServerSide(token).delete(`/product/product/${id}/`)
}