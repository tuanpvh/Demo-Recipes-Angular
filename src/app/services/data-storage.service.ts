import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipe = this.recipeService.getRecipeList();
    this.http
      .put(
        'https://ng-project-recipes-836af-default-rtdb.firebaseio.com/recipes.json',
        recipe
      )
      .subscribe((respon) => {
        console.log(respon);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-project-recipes-836af-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
