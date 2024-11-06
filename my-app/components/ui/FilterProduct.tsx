'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'
import Product from './Product'
type SortOption = {
    name: string
    value: string
    current: boolean
}

type FilterOption = {
    id: string
    name: string
    options: string[]
}

type Product = {
    id: string
    name: string
    description: string
}

const sortOptions: SortOption[] = [
    { name: 'Most Popular', value: 'popular', current: true },
    { name: 'Best Rating', value: 'rating', current: false },
    { name: 'Newest', value: 'newest', current: false },
    { name: 'Price: Low to High', value: 'price_asc', current: false },
    { name: 'Price: High to Low', value: 'price_desc', current: false },
]

const filters: FilterOption[] = [
    { id: 'color', name: 'Color', options: ['white', 'beige', 'blue', 'brown', 'green', 'purple'] },
    { id: 'category', name: 'Category', options: ['new-arrivals', 'sale', 'travel', 'organization', 'accessories'] },
    { id: 'size', name: 'Size', options: ['2l', '6l', '12l', '18l', '20l', '40l'] },
]

type SelectedFilters = {
    [key: string]: string[]
}

export default function FilterProduct() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false)
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({ color: [], category: [], size: [] })
    const [products, setProducts] = useState<Product[]>([])

    // Fetch products based on filters
    const fetchProducts = async () => {
        const query = new URLSearchParams()
        for (const [key, values] of Object.entries(selectedFilters)) {
            values.forEach((value) => query.append(key, value))
        }

        try {
            const response = await axios.get<Product[]>(`/api/products?${query.toString()}`)
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [selectedFilters])

    const handleFilterChange = (filterId: string, option: string) => {
        setSelectedFilters((prev) => {
            const newFilters = { ...prev }
            const isSelected = newFilters[filterId].includes(option)
            newFilters[filterId] = isSelected
                ? newFilters[filterId].filter((item) => item !== option)
                : [...newFilters[filterId], option]
            fetchProducts(); // קריאה ל-fetchProducts לאחר שינוי הסינונים
            return newFilters
        })
    }

    return (
        <div className="bg-white">
            <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop />
                <DialogPanel className="relative flex h-full w-full max-w-xs bg-white p-4 pb-12 shadow-xl">
                    <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400 p-2">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </DialogPanel>
            </Dialog>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
                    <div className="flex items-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="text-gray-700 hover:text-gray-900">
                                Sort
                                <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-400" />
                            </MenuButton>
                            <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5">
                                {sortOptions.map((option) => (
                                    <MenuItem key={option.value}>
                                        <button
                                            onClick={() => {
                                                setSelectedFilters((prev) => ({ ...prev, sort: [option.value] }))
                                                fetchProducts(); // קריאה ל-fetchProducts לאחר שינוי הסינון
                                            }}
                                            className="block px-4 py-2 text-sm text-gray-700"
                                        >
                                            {option.name}
                                        </button>
                                    </MenuItem>
                                ))}
                            </MenuItems>
                        </Menu>
                        <button onClick={() => setMobileFiltersOpen(true)} className="ml-4 p-2 text-gray-400 hover:text-gray-500">
                            <AdjustmentsHorizontalIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    <form className="hidden lg:block">
                        {filters.map((section) => (
                            <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                <DisclosureButton className="flex w-full justify-between bg-white py-3 text-sm font-medium text-gray-900">
                                    {section.name}
                                    <ChevronDownIcon className="ml-6 h-5 w-5 text-gray-400" />
                                </DisclosureButton>
                                <DisclosurePanel className="pt-6">
                                    <div className="space-y-4">
                                        {section.options.map((option) => (
                                            <div key={option} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFilters[section.id]?.includes(option)}
                                                    onChange={() => handleFilterChange(section.id, option)}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label className="ml-3 text-sm text-gray-600">{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                </DisclosurePanel>
                            </Disclosure>
                        ))}
                    </form>

                    <div className="lg:col-span-3">
                        {products.map((product) => (
                            <div key={product.id} className="border rounded p-4">
                                <h3 className="text-lg font-medium">{product.name}</h3>
                                <p>{product.description}</p> 
                                 <Product key={product.id} product={product} />
                            </div>
                            
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
