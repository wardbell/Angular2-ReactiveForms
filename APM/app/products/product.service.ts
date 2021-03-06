import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private _productUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    getProducts(): Observable<IProduct[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <IProduct[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => this.handleMap(products, id));
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private handleMap(products: IProduct[], id: number): IProduct {
        // Return an initialized object
        if (id === 0) {
            return {
                productId: 0,
                productName: null,
                productCode: null,
                tags: [''],
                releaseDate: null,
                price: null,
                description: null,
                starRating: null,
                imageUrl: null
            };
        }
        let filtered = products.filter(p => p.productId === id);
        return <IProduct> filtered[0];
    }
}
