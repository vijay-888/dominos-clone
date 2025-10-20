import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FavoriteItem {
    id: number;
    name: string;
    price: string;
    image: string;
    category?: string;
}

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private static STORAGE_KEY = 'ff_favorites_v1';

    private favoritesSubject = new BehaviorSubject<FavoriteItem[]>(this.loadFromStorage());
    favorites$ = this.favoritesSubject.asObservable();

    getFavorites(): FavoriteItem[] {
        return this.favoritesSubject.getValue();
    }

    isFavorite(id: number): boolean {
        return this.getFavorites().some(item => item.id === id);
    }

    addToFavorites(item: FavoriteItem): void {
        if (this.isFavorite(item.id)) {
            return;
        }
        const updated = [...this.getFavorites(), item];
        this.persist(updated);
    }

    removeFromFavorites(id: number): void {
        const updated = this.getFavorites().filter(item => item.id !== id);
        this.persist(updated);
    }

    toggleFavorite(item: FavoriteItem): void {
        if (this.isFavorite(item.id)) {
            this.removeFromFavorites(item.id);
        } else {
            this.addToFavorites(item);
        }
    }

    private persist(list: FavoriteItem[]): void {
        this.favoritesSubject.next(list);
        try {
            localStorage.setItem(FavoritesService.STORAGE_KEY, JSON.stringify(list));
        } catch { }
    }

    private loadFromStorage(): FavoriteItem[] {
        try {
            const raw = localStorage.getItem(FavoritesService.STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    }
}


