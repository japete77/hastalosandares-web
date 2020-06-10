import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Cart } from 'src/models/cart';

@Injectable()
export class Data {
    constructor(private http: HttpClient) {}
    
    load(name: string) : Promise<Cart> {
        if (name) {
            const jsonFile = `assets/data/${name}.json`;
            return new Promise<Cart>((resolve, reject) => {
                this.http.get(jsonFile).toPromise().then((response : Cart) => {
                    resolve(<Cart>response);
                }).catch((response: any) => {
                    reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
                });
            });
        }
    }
}