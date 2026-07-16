"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequireAuth from "@/components/RequireAuth";
import {
  CATEGORIES_QUERY,
  CREATE_CATEGORY_MUTATION,
  CREATE_PRODUCT_MUTATION,
  PRODUCTS_QUERY,
} from "@/lib/graphql/products";
import type {
  CategoriesData,
  CreateCategoryData,
  CreateCategoryVars,
  CreateProductData,
  CreateProductVars,
} from "@/lib/graphql/products";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function AdminPageContent() {
  const { data: categoryData, refetch: refetchCategories } =
    useQuery<CategoriesData>(CATEGORIES_QUERY);
  const categories = categoryData?.categories ?? [];

  const [categoryName, setCategoryName] = useState("");
  const [categoryMessage, setCategoryMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const [createCategory, { loading: creatingCategory }] = useMutation<
    CreateCategoryData,
    CreateCategoryVars
  >(CREATE_CATEGORY_MUTATION);

  async function handleCreateCategory(e: React.FormEvent) {
    e.preventDefault();
    setCategoryMessage(null);
    try {
      await createCategory({
        variables: { name: categoryName, slug: slugify(categoryName) },
      });
      setCategoryMessage({ type: "ok", text: `"${categoryName}" created.` });
      setCategoryName("");
      refetchCategories();
    } catch (err) {
      setCategoryMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to create category.",
      });
    }
  }

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [badge, setBadge] = useState("");
  const [stock, setStock] = useState("10");
  const [categoryId, setCategoryId] = useState("");
  const [productMessage, setProductMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setImageUrl(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const [createProduct, { loading: creatingProduct }] = useMutation<
    CreateProductData,
    CreateProductVars
  >(CREATE_PRODUCT_MUTATION, {
    refetchQueries: [{ query: PRODUCTS_QUERY }],
  });

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    setProductMessage(null);

    if (!categoryId) {
      setProductMessage({ type: "error", text: "Choose a category first." });
      return;
    }

    try {
      await createProduct({
        variables: {
          input: {
            name: productName,
            price: parseFloat(price),
            oldPrice: oldPrice ? parseFloat(oldPrice) : undefined,
            badge: badge || undefined,
            stock: parseInt(stock, 10),
            categoryId,
            images: imageUrl ? [imageUrl] : [],
          },
        },
      });
      setProductMessage({ type: "ok", text: `"${productName}" created.` });
      setProductName("");
      setPrice("");
      setOldPrice("");
      setBadge("");
      setStock("10");
      setImageUrl("");
    } catch (err) {
      setProductMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to create product.",
      });
    }
  }

  return (
    <main>
      <Navbar />
      <div className="px-8 py-10 max-w-4xl">
        <h1 className="text-3xl font-bold mb-1">Admin</h1>
        <p className="text-slate-500 text-sm mb-10">Add categories and products to the catalog.</p>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Category form */}
          <div>
            <h2 className="font-semibold mb-4">New Category</h2>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Name</label>
                <input
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Home Decor"
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                />
                {categoryName && (
                  <p className="text-xs text-slate-400 mt-1">
                    Slug: {slugify(categoryName)}
                  </p>
                )}
              </div>
              {categoryMessage && (
                <p className={`text-sm ${categoryMessage.type === "ok" ? "text-green-600" : "text-red-500"}`}>
                  {categoryMessage.text}
                </p>
              )}
              <button
                type="submit"
                disabled={creatingCategory}
                className="bg-slate-900 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {creatingCategory ? "Creating…" : "Create category"}
              </button>
            </form>
            <div className="mt-6">
              <p className="text-xs font-medium text-slate-500 mb-2">Existing categories</p>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id} className="text-sm text-slate-600">
                    {cat.name} <span className="text-slate-400">({cat.productCount})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product form */}
          <div>
            <h2 className="font-semibold mb-4">New Product</h2>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Name</label>
                <input
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Essential Hoodie"
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Price</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="59.99"
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Old price (optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    placeholder="79.99"
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Badge (optional)</label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">None</option>
                    <option value="New">New</option>
                    <option value="Bestseller">Bestseller</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Stock</label>
                  <input
                    required
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Product image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageSelect}
                  className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-slate-900 file:text-white file:text-xs"
                />
                {uploading && <p className="text-xs text-slate-400 mt-1">Uploading…</p>}
                {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
                {imageUrl && !uploading && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={imageUrl} alt="Preview" className="w-14 h-14 object-cover rounded border border-slate-200" />
                    <span className="text-xs text-green-600">Uploaded</span>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Category</label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select a category…</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              {productMessage && (
                <p className={`text-sm ${productMessage.type === "ok" ? "text-green-600" : "text-red-500"}`}>
                  {productMessage.text}
                </p>
              )}
              <button
                type="submit"
                disabled={creatingProduct}
                className="bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm px-4 py-2 rounded-md disabled:opacity-50"
              >
                {creatingProduct ? "Creating…" : "Create product"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function AdminPage() {
  return (
    <RequireAuth adminOnly>
      <AdminPageContent />
    </RequireAuth>
  );
}