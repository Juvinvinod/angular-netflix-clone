import { Injectable } from "@angular/core";
import { emptyAction, showAlert } from "./app.action";
import { exhaustMap, map } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AppEffects {
    constructor(private $action: Actions, private snackbar: MatSnackBar) { }


_showAlert = createEffect(() =>
    this.$action.pipe(
        ofType(showAlert),
        exhaustMap((action) => {
            return this.ShowSnackBarAlert(action.message, action.resultType).afterDismissed().pipe(
                map(() => {
                    return emptyAction();
                })
            )
        })
    ))

    ShowSnackBarAlert(message: string, resultType: string = 'fail') {
        let _class = resultType == 'pass' ? 'green-snackbar' : 'red-snackbar'
        return this.snackbar.open(message, 'OK', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 5000,
            panelClass: [_class]
        })
    }
}