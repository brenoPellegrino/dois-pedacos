import IStockHandlerFormProps from "../../interfaces/IStockHandlerFormProps";

export default function StockHandle({isChecked, editionHandler}: IStockHandlerFormProps) {
  return (
    <div>
        <h2>Edição de estoque:</h2>
        <ul>
          {
            isChecked.length > 0 &&
            isChecked.map(ingredient => (
              <li key={ingredient.id}>
                <p>
                  {ingredient.stock[0].quantity} {ingredient.stock[0].mesure} {ingredient.name}
                </p>
                <input
                  type="number"
                  onChange={(e) => editionHandler(ingredient.id, Number(e.target.value))}
                />
              </li>
            ))}
        </ul>
      </div>
  )
}
