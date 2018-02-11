import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { ProgressService, BrowserXhrWithProgress } from '../../services/progress.service';
import { BrowserXhr } from '@angular/http';
import { AuthService } from '../../services/auth.service';

@Component({
    templateUrl: 'view-vehicle.html',
    providers: [
        { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
        ProgressService
    ]
})
export class ViewVehicleComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    vehicle: any;
    vehicleId: number;
    photos: any[];
    progress: any;

    constructor(
        private zone: NgZone,
        private route: ActivatedRoute,
        private router: Router,
        private toasty: ToastyService,
        private vehicleService: VehicleService,
        private photoService: PhotoService,
        private progressService: ProgressService,
private auth: AuthService    ) {

        route.params.subscribe(p => {
            this.vehicleId = +p['id'];
            if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
                router.navigate(['/vehicles']);
                return;
            }
        });
    }

    ngOnInit() {

        this.photoService.getPhotos(this.vehicleId)
            .subscribe(photos => this.photos = photos);

        this.vehicleService.getVehicle(this.vehicleId)
            .subscribe(
            v => this.vehicle = v,
            err => {
                if (err.status == 404) {
                    this.router.navigate(['/vehicles']);
                    return;
                }
            });
    }

    delete() {
        if (confirm("Are you sure?")) {
            this.vehicleService.delete(this.vehicle.id)
                .subscribe(x => {
                    this.router.navigate(['/vehicles']);
                });
        }
    }


    uploadPhoto() {


        this.progressService.startTracking()
            .subscribe(progress => {
                console.log(progress);
                this.zone.run(() => {
                    this.progress = progress;
                });
            },
            error => { },
            () => { this.progress = null; });


        var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        if (nativeElement != null && nativeElement.files != null) {

            var file = nativeElement.files[0];
            nativeElement.value = '';
            this.photoService.upload(this.vehicleId, file)
                .subscribe(photo => {
                    this.photos.push(photo);
                },
                error => {
                    this.toasty.error({
                        title: 'Error',
                        msg: error.text(),
                        theme: 'bootstrap',
                        showClose: true,
                        timeout: 5000
                    });
                }
                );
        }
    }

}