import IIgredientsSearchResultsProps from '../../interfaces/IIgredientsSearchResultsProps'

export default function IgredientSearchResults({searchResults, handleIngredientCheck}: IIgredientsSearchResultsProps) {
  return (
    <ul>
        {searchResults.length > 0 &&
          searchResults.map(ingredient => (
            <li key={ingredient.id}>
              <input
                  type="checkbox"
                  checked={ingredient.checked}
                  onChange={() => handleIngredientCheck(ingredient.id)}
              />
                {ingredient.name}
            </li>
              ))}
      </ul>
  )
}
