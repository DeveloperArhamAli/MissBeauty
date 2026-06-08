import { create } from 'zustand'

const useFilterStore = create((set) => ({
  activeCategory: 'all',
  sortBy: 'featured',
  viewMode: 'grid',
  priceRange: [0, 5000],
  selectedBrands: [],
  onlyInStock: false,
  onlyOnSale: false,
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 12,
  mobileFilterOpen: false,

  setActiveCategory: (category) => set({ activeCategory: category, currentPage: 1 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setViewMode: (viewMode) => set({ viewMode }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSelectedBrands: (brands) => set({ selectedBrands: brands }),
  toggleBrand: (brand) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter((item) => item !== brand)
        : [...state.selectedBrands, brand],
    })),
  setOnlyInStock: (value) => set({ onlyInStock: value }),
  setOnlyOnSale: (value) => set({ onlyOnSale: value }),
  setSearchQuery: (value) => set({ searchQuery: value, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),
  openMobileFilters: () => set({ mobileFilterOpen: true }),
  closeMobileFilters: () => set({ mobileFilterOpen: false }),
  toggleMobileFilters: () => set((state) => ({ mobileFilterOpen: !state.mobileFilterOpen })),
  resetFilters: () =>
    set({
      activeCategory: 'all',
      sortBy: 'featured',
      viewMode: 'grid',
      priceRange: [0, 5000],
      selectedBrands: [],
      onlyInStock: false,
      searchQuery: '',
      currentPage: 1,
    }),
}))

export default useFilterStore
