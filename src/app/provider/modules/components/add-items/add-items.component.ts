import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {
  addItemForm!: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isSubmitting = false;
  showSuccessModal = false;

  categories = [
    { id: 'veg-pizza', name: 'Veg Pizza\'s' },
    { id: 'non-veg-pizza', name: 'Non Veg Pizza\'s' },
    { id: 'burger-pizza', name: 'Burger Pizza\'s' },
    { id: 'pizza-mania', name: 'Pizza Mania' },
    { id: 'sides', name: 'Sides' }
  ];

  allergens = [
    'None', 'Dairy', 'Gluten', 'Pork', 'Beef', 'Chicken', 'Fish', 'Nuts', 'Soy', 'Eggs'
  ];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.addItemForm = this.fb.group({
      // Basic Information
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      detailedDescription: ['', [Validators.required, Validators.minLength(20)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],

      // Image
      image: [null, Validators.required],

      // Nutritional Information
      calories: ['', [Validators.required, Validators.min(0)]],
      protein: ['', [Validators.required, Validators.min(0)]],
      carbs: ['', [Validators.required, Validators.min(0)]],
      fat: ['', [Validators.required, Validators.min(0)]],
      fiber: ['', [Validators.required, Validators.min(0)]],
      sodium: ['', [Validators.required, Validators.min(0)]],

      // Additional Information
      preparationTime: ['', Validators.required],
      size: ['', Validators.required],
      allergens: [[], Validators.required],

      // Ingredients (as comma-separated string)
      ingredients: ['', Validators.required],

      // Rating (optional, can be set by admin)
      rating: [4.0, [Validators.min(0), Validators.max(5)]]
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      // Update form control
      this.addItemForm.patchValue({
        image: file
      });
    }
  }

  onAllergenChange(event: any, allergen: string): void {
    const allergens = this.addItemForm.get('allergens')?.value || [];

    if (event.target.checked) {
      // Add allergen if not already present
      if (!allergens.includes(allergen)) {
        allergens.push(allergen);
      }
    } else {
      // Remove allergen
      const index = allergens.indexOf(allergen);
      if (index > -1) {
        allergens.splice(index, 1);
      }
    }

    this.addItemForm.patchValue({
      allergens: allergens
    });
  }

  onSubmit(): void {
    if (this.addItemForm.valid && this.selectedImage) {
      this.isSubmitting = true;

      // Prepare form data
      const formData = this.prepareFormData();

      // Simulate API call
      setTimeout(() => {
        console.log('Item data to be submitted:', formData);
        this.showSuccessModal = true;
        this.resetForm();
        this.isSubmitting = false;
      }, 2000);
    } else {
      this.markFormGroupTouched();
      alert('Please fill in all required fields and select an image.');
    }
  }

  private prepareFormData(): any {
    const formValue = this.addItemForm.value;

    // Convert ingredients string to array
    const ingredientsArray = formValue.ingredients
      .split(',')
      .map((ingredient: string) => ingredient.trim())
      .filter((ingredient: string) => ingredient.length > 0);

    return {
      // Basic Information
      name: formValue.name,
      description: formValue.description,
      detailedDescription: formValue.detailedDescription,
      price: `$${formValue.price}`,
      category: formValue.category,
      rating: formValue.rating,

      // Image (in real app, this would be uploaded to server)
      image: this.imagePreview,

      // Nutritional Information
      nutritionalInfo: {
        calories: formValue.calories,
        protein: `${formValue.protein}g`,
        carbs: `${formValue.carbs}g`,
        fat: `${formValue.fat}g`,
        fiber: `${formValue.fiber}g`,
        sodium: `${formValue.sodium}mg`
      },

      // Additional Information
      preparationTime: formValue.preparationTime,
      size: formValue.size,
      allergens: formValue.allergens,
      ingredients: ingredientsArray,

      // Additional fields for display
      largeImage: this.imagePreview,
      reviews: [], // Empty initially
      similarItems: [] // Empty initially
    };
  }

  private markFormGroupTouched(): void {
    Object.keys(this.addItemForm.controls).forEach(key => {
      const control = this.addItemForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm(): void {
    this.addItemForm.reset();
    this.selectedImage = null;
    this.imagePreview = null;
    this.initializeForm();
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/provider/dashboard']);
  }

  closeSuccessModalAndReset(): void {
    this.showSuccessModal = false;
    this.resetForm();
  }

  // Helper methods for form validation
  isFieldInvalid(fieldName: string): boolean {
    const field = this.addItemForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.addItemForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['min']) return `${fieldName} must be greater than 0`;
      if (field.errors['max']) return `${fieldName} must be less than 5`;
    }
    return '';
  }
}
