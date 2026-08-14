import React from 'react'

interface SearchFilterProps{
    search: string
    setSearch: (value: string) => void
    category: string
    setCategory: (value: string) => void
    categories: string[]
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) => {
   return(
     <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={category}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
        className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
   )
}