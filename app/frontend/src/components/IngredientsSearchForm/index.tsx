import IngredientsSearchFormProps from "../../interfaces/IIgredientsSearchFormProps";

export default function IngredientsSearchForm({ searchTerm, handleSearch }: IngredientsSearchFormProps) {
  return (
    <div>
    <input
      type="text"
      placeholder="Digite o nome do ingrediente"
      value={searchTerm}
      onChange={e => handleSearch(e.target.value)}
    />
  </div>
  )
}
