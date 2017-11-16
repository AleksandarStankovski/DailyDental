import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SnackbarConfig } from '../models/snackbar-config-model';
import { CudService} from '../../core/cud.service';

@Component({
    selector: 'app-modal-action',
    templateUrl: './modal-action.component.html',
    styleUrls: ['./modal-action.component.scss']
})
export class ModalActionComponent implements OnInit {

    snackbarConfig: SnackbarConfig;
    @Input() formIsDisabled: boolean;
    @Input() dataId: string;
    @Input() type: string;
    @Input() data;
    @Input() showDeleteBtn: boolean;
    @Output() toggleLoadingOverlayEvent: EventEmitter<boolean> = new EventEmitter();
    @Output() modalCloseEvent: EventEmitter<string> = new EventEmitter();

    constructor(
        private snackBar: MatSnackBar,
        private cudService: CudService) {}

    ngOnInit() {
        this.snackbarConfig = new SnackbarConfig();
    }

    toggleLoadingOverlay(loadingOverlay: boolean): void {
        this.toggleLoadingOverlayEvent.emit(loadingOverlay);
    }

    modalClose(type: string): void {
        this.modalCloseEvent.emit(type);
    }

    getError(errorCode): string {
        let errorMsg = 'Моля, опитайте отново';
        if (errorCode === 11000) {
            switch (this.type) {
                case 'doctor':
                    errorMsg = 'Моля, въведете различнен e-mail'
                    break;
                default:
                    errorMsg = 'Моля, въведете различно име'
                    break;
            }
        }
        return errorMsg;
    }

    save(): void {
        this.toggleLoadingOverlay(true);
        if (this.dataId) {
            this.cudService.edit(this.type, this.data)
            .subscribe(
                response => {
                    const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.modalClose('Edit');
                    }, this.snackbarConfig.duration);
                }, error => {
                    const errorObj = JSON.parse(error._body);
                    const errorMsg = this.getError(errorObj.code);
                    const snackBarRef = this.snackBar.open(errorMsg, '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                       this.toggleLoadingOverlay(false);
                    }, this.snackbarConfig.duration);
                    throw new Error(error);
                }
            );
        } else {
            this.cudService.create(this.type, this.data)
            .subscribe(
                response => {
                    const snackBarRef = this.snackBar.open('Данните бяха запазени успешно', '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.modalClose('Create');
                    }, this.snackbarConfig.duration);
                },
                error => {
                    const errorObj = JSON.parse(error._body);
                    const errorMsg = this.getError(errorObj.code);
                    const snackBarRef = this.snackBar.open(errorMsg, '', {
                        duration: this.snackbarConfig.duration
                    });
                    setTimeout(() => {
                        this.toggleLoadingOverlay(false);
                    }, this.snackbarConfig.duration);
                    throw new Error(error);
                }
            );
        }
    }

    delete(): void {
        this.toggleLoadingOverlay(true);
        this.cudService.delete(this.type, this.dataId)
        .subscribe(
            response => {
                const snackBarRef = this.snackBar.open('Данните бяха изтрити успешно', '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.modalClose('Delete');
                }, this.snackbarConfig.duration);
            },
            error => {
                const errorObj = JSON.parse(error._body);
                const errorMsg = this.getError(errorObj.code);
                const snackBarRef = this.snackBar.open(errorMsg, '', {
                    duration: this.snackbarConfig.duration
                });
                setTimeout(() => {
                    this.toggleLoadingOverlay(false);
                }, this.snackbarConfig.duration);
                throw new Error(error);
            }
        );
    }

}
