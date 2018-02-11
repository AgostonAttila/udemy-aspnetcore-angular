import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class ProgressService {
    constructor() { }

    private uploadProgress: Subject<any>;

    startTracking() {
        this.uploadProgress = new Subject();
        return this.uploadProgress;
    }

    notify(progress: any) {
        this.uploadProgress.next(progress);
    }

    endTrack() {
        this.uploadProgress.complete();
    }

    //downloadProgress: Subject<any> = new Subject();

    //XMLHttpRequest
    //Angular BrowserXHr
}

@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {
    constructor(private service: ProgressService) { super(); }

    build(): XMLHttpRequest {
        var xhr: XMLHttpRequest = super.build();

        //xhr.onprogress = (event) => {
        //    this.service.downloadProgress.next(this.createProgress(event));
        //};

        xhr.upload.onprogress = (event) => {
            this.service.notify(this.createProgress(event));
        };

        xhr.upload.onloadend = () => {
            this.service.endTrack();
        }

        return xhr;
    }

    private createProgress(event:any) {
        return {
            total: event.total,
            percentage: Math.round(event.loaded / event.total * 100)
        }
    }
}