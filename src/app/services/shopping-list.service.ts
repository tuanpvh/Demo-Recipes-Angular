import { Ingredient } from '../shared/ingredient..model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingreddientChange = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingreddientChange.next(this.ingredients.slice());
  }

  addIngredientFromRecipe(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingreddientChange.next(this.ingredients.slice());
  }

  updateIngreddient(index: number, newIngreddient: Ingredient) {
    this.ingredients[index] = newIngreddient;
    this.ingreddientChange.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingreddientChange.next(this.ingredients.slice());
  }
}
