import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient..model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChange = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Pizza',
  //     'Pizza Description',
  //     'https://img.dominos.vn/cach-lam-pizza-chay-0.jpg',
  //     [new Ingredient('Meet', 10), new Ingredient('Bread', 5)]
  //   ),
  //   new Recipe(
  //     'Spaghetti',
  //     'Spaghetti Description',
  //     'https://product.hstatic.net/1000389344/product/bolognese_spaghetti_d0e06574d8fc4b168386961c927e1750.jpg',
  //     [new Ingredient('Meat', 20), new Ingredient('Noodles', 15)]
  //   ),
  //   new Recipe(
  //     'Banh mi',
  //     'Banh mi Description',
  //     'https://cdn.tgdd.vn/Files/2021/07/27/1371175/huong-dan-3-cach-lam-banh-mi-bo-thom-ngon-de-lam-cho-bua-sang-du-chat-202201041019538628.jpg',
  //     [new Ingredient('Pate', 5), new Ingredient('Cha', 2)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChange.next(this.recipes.slice());
  }

  getRecipeList() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientFromRecipe(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChange.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChange.next(this.recipes.slice());
  }
}
