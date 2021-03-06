import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Vehicle, SaveVehicle } from '../models/vehicle';

@Injectable()
export class VehicleService {

    constructor(private http : Http) { }

    getVehicle(id: number) {
        return this.http.get('/api/vehicles/'+id)
            .map(res => res.json());
    }

    getMakes(){
        return this.http.get('/api/makes')
            .map(res => res.json());
    }

    getFeatures() {
        return this.http.get('/api/features')
            .map(res => res.json());
    }

    create(vehicle: {}) {
        return this.http.get('/api/vehicles',vehicle)
            .map(res => res.json());
    }

    update(vehicle: SaveVehicle) {
        return this.http.put('/api/vehicles/' + vehicle.id, vehicle)
            .map(res => res.json());
    }

    delete(id: number) {
        return this.http.delete('/api/vehicles/' + id)
            .map(res => res.json());
    }
}
