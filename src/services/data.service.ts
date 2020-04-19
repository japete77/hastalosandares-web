import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/models/cart';

@Injectable()
export class Data {
    static cart: Cart;

    constructor(private http: HttpClient) {}
    
    load() {
        const jsonFile = `assets/data/cart.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response : Cart) => {
                Data.cart = <Cart>response;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}