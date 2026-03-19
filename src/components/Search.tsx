import { Field } from './ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { SearchIcon, XIcon } from 'lucide-react'

interface SearchProps {
  handleSearch: (searchQuery: string) => void;
  searchQuery: string;
}

export default function Search({ handleSearch, searchQuery }: SearchProps) {
  return (
    <Field className='p-2 px-4'>
      <InputGroup className='shadow-none'>
        <InputGroupInput id="input-group-url" placeholder="検索..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
        {searchQuery.length > 0 && (
        <InputGroupAddon align="inline-end">
          < XIcon className='cursor-pointer' onClick={() => handleSearch('')}/>
        </InputGroupAddon>
        )}
      </InputGroup>
    </Field>
  )
}
