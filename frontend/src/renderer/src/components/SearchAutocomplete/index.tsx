import React from 'react'
import { SearchIcon } from '../Icons/SearchIcon'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

interface SearchAutocompleteProps<T> {
  label: string
  itemKey: keyof T
  itemLabel: keyof T
  placeholder?: string
  defaultItem?: T | null
  searchFunction: (query: string) => Promise<T[]>
  setSelectedItem: (item: T | undefined) => void
}

export const SearchAutocomplete = <T extends { id: React.Key }>({
  label,
  itemKey,
  itemLabel,
  placeholder = 'Buscar...',
  defaultItem = null,
  searchFunction,
  setSelectedItem,
}: SearchAutocompleteProps<T>) => {
  const [result, setResult] = React.useState<T[]>([])
  const [searchValue, setSearchValue] = React.useState<string>('')

  const handleChange = (e: string) => {
    setSearchValue(e)
  }

  React.useEffect(() => {
    const onSubmit = async () => {
      if (searchValue.trim() === '') return
      if (searchValue.length < 3) return

      const response = await searchFunction(searchValue)
      setResult(response)
    }
    onSubmit()
  }, [searchValue, searchFunction])

  const itemsToDisplay = result.length > 0 ? result : defaultItem ? [defaultItem] : []

  const handleSelectionChange = (key: React.Key | null) => {
    const selectedItem = itemsToDisplay.find((item) => String(item[itemKey]) === String(key))
    setSelectedItem(selectedItem)
  }

  return (
    <Autocomplete
      items={itemsToDisplay}
      label={label}
      defaultSelectedKey={defaultItem ? String(defaultItem.id) : undefined}
      aria-label={label}
      isClearable={true}
      placeholder={placeholder}
      errorMessage='Sin resultados.'
      listboxProps={{
        emptyContent: 'Sin resultados',
        hideSelectedIcon: true,
      }}
      startContent={<SearchIcon />}
      onInputChange={handleChange}
      onSelectionChange={handleSelectionChange}
    >
      {(item) => (
        <AutocompleteItem key={String(item[itemKey])} textValue={String(item[itemLabel])}>
          <h3 className='text-[var(--text)]'>{String(item[itemLabel])} {String(item['lastName'])}</h3>
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
