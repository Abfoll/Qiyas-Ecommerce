import { gql } from "@apollo/client";

export type BackendProduct = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number | null;
  rating: number;
  reviewsCount: number;
  badge?: string | null;
  images: string[];
  category: { name: string; slug: string };
};

export type BackendCategory = {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  productCount: number;
};

export type ProductsData = { products: BackendProduct[] };
export type ProductsVars = {
  filter?: { categorySlug?: string; maxPrice?: number; search?: string };
  sort?: "FEATURED" | "PRICE_ASC" | "PRICE_DESC" | "RATING" | "NEWEST";
};

export type CategoriesData = { categories: BackendCategory[] };

export const PRODUCTS_QUERY = gql`
  query Products($filter: ProductFilterInput, $sort: ProductSort) {
    products(filter: $filter, sort: $sort) {
      id
      name
      price
      oldPrice
      rating
      reviewsCount
      badge
      images
      category {
        name
        slug
      }
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
      slug
      image
      productCount
    }
  }
`;

export type CreateCategoryData = { createCategory: BackendCategory };
export type CreateCategoryVars = { name: string; slug: string; image?: string };

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($name: String!, $slug: String!, $image: String) {
    createCategory(name: $name, slug: $slug, image: $image) {
      id
      name
      slug
      image
      productCount
    }
  }
`;

export type ProductInput = {
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  stock: number;
  images?: string[];
  categoryId: string;
};

export type CreateProductData = { createProduct: BackendProduct };
export type CreateProductVars = { input: ProductInput };

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      oldPrice
      rating
      reviewsCount
      badge
      category {
        name
        slug
      }
    }
  }
`;