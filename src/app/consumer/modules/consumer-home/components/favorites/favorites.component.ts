import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService, FavoriteItem } from 'src/app/shared/services/favorites.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    favorites: FavoriteItem[] = [];

    constructor(private router: Router, private favoritesService: FavoritesService) { }

    ngOnInit(): void {
        this.favoritesService.favorites$.subscribe(list => {
            this.favorites = list;
        });
    }

    goToDashboard(): void {
        this.router.navigate(['/consumer/dashboard']);
    }

    removeFavorite(id: number): void {
        this.favoritesService.removeFromFavorites(id);
    }

    goToDetails(item: FavoriteItem): void {
        this.router.navigate(['/consumer/menu-item', item.id], {
            queryParams: {
                name: encodeURIComponent(item.name),
                description: encodeURIComponent(''),
                price: encodeURIComponent(item.price),
                rating: 0,
                category: encodeURIComponent(item.category || ''),
                image: encodeURIComponent(item.image)
            }
        });
    }

}
