import { useState, useEffect, useMemo } from 'react'
import { useFetchProduct } from './hooks/useFetchProducts'
import { ProductCard } from './components/ProductCard'
import { SearchFilter } from './components/SearchFilter'


export default function App(){
  const {products, loading, error} = useFetchProduct()
  const [search, setSearch] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect (() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item ! == id) : [...prev, id]
    )
  }

  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))]
  }, [products])

  const filteredProducts = products.filter(product => {
    const matchesSeacrh = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory == 'all' || product.category === selectedCategory
     return matchesSeacrh && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Product Dashboard</h1>
          <span className="text-sm font-medium bg-white px-3 py-1.5 rounded-full border border-slate-200">
            Favorites: ❤️ {favorites.length}
          </span>
        </header>

        <SearchFilter 
          search={search}
          setSearch={setSearch}
          category={selectedCategory}
          setCategory={setSelectedCategory}
          categories={categories}
        />

        {loading && <p className="text-center py-12 text-slate-500">Loading products...</p>}
        {error && <p className="text-center py-12 text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

