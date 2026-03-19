import { Field } from './ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { SearchIcon } from 'lucide-react'

interface SearchProps {
  handleSearch: (query: string) => void;
}

export default function Search({ handleSearch }: SearchProps) {
  return (
    <Field className='py-2 px-4'>
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="検索..." onChange={(e) => handleSearch(e.target.value)} />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
