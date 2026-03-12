import { Field } from './ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { SearchIcon } from 'lucide-react'

export default function Search() {
  return (
    <Field className='p-2'>
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="検索..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
