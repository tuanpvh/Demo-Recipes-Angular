import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient..model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppinglistForm: NgForm;
  subcription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subcription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.shoppinglistForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const newIngreddient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngreddient(
        this.editItemIndex,
        newIngreddient
      );
    } else {
      this.shoppingListService.addIngredient(newIngreddient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppinglistForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
