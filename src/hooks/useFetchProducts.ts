import { useState, useEffect } from "react";
import type { Product } from "../types/product";

export const useFetchProduct = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const res = await fetch('https://fakestoreapi.com/products')
                if (!res.ok) throw new Error('Failed to fetch data')
                const data: Product[] = await res.json()
                setProducts(data)    
            }catch(err){
                setError(err instanceof Error ? err.message: 'An unknown error occurred')
            }finally{
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return {products, loading, error}
}