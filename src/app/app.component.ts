import { Component, OnInit, AfterViewInit } from "@angular/core";
import {FormControl} from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { fromEvent, of, merge } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DialogComponent } from "../app/dialog.component";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from "@angular/material";
declare var PouchDB: any;
declare var swRegistration: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  online$: any;
  offLine: boolean = false;
  pouchInstance: any;
  isLoggedIn: boolean = false;
  userName: any;
  articles: any[];
  resultantArticlesAfterSearch: any[];

  myControl: FormControl = new FormControl();

  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router,public snackBar: MatSnackBar) {
    let userData = localStorage.getItem("userData");
    if (userData !== "undefined" && userData !== "" && userData !== null) {
      this.isLoggedIn = true;
      this.userName = JSON.parse(userData).name;
    }
  }

  ngAfterViewInit() {
    if (window.indexedDB) {
      this.pouchInstance = new PouchDB("meanboiler");
    }
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, "online"),
      fromEvent(window, "offline")
    );
    this.online$.subscribe((x: any) => {
      let self = this;
      if (x === true || x.type == "online") {
        self.snackBar.open('App is Online', 'Okay', {
          duration: 2000
        });
        self.syncData();
      } else if (x.type == "offline") {
        self.snackBar.open('App is Offline', 'Okay', {
          duration: 2000
        });
      }
    });
    let self = this;
    if (!self.pouchInstance) return;
          self.pouchInstance;
          self.pouchInstance
            .get("articles")
            .then(function(doc) {
              self.articles = doc.val;
              self.resultantArticlesAfterSearch = doc.val;
            })
            .then(function(response) {})
            .catch(function(err) {
              console.log(err);
            });
  }
  onSearchChange(searchValue : string ) { 
    this.resultantArticlesAfterSearch = this.articles.filter(function(eachArticle) {
      return eachArticle.title.indexOf(searchValue) !== -1;
    });
  }
  openDialog(routeNameParam): void {
    if (routeNameParam) {
      let userData = localStorage.getItem("userData");
      if (userData) {
        this.router.navigate([routeNameParam]);
        return;
      }
    }
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoggedIn = result.isLoggedIn;
        this.userName = result.userData.obj.name;
        localStorage.setItem("userData", JSON.stringify(result.userData.obj));
        if (routeNameParam) {
          this.router.navigate([routeNameParam]);
        }
      }
    });
  }
  onLogoutClick(): void {
    localStorage.removeItem("userData");
    this.isLoggedIn = false;
    this.router.navigate([""]);
  }
  updateSubscriptionOnServer(subscription) {
    let obj: any = {};
    obj.endPoint = subscription.endpoint;
    obj.keys = {};
    obj.keys.p256dh = subscription.keys.p256dh;
    obj.keys.auth = subscription.keys.auth;

    let result = this.http.post(`/api/subscription`, obj).subscribe(x => {
      console.log(x);
    });
  }
  urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  pushInitialize() {
    let self = this;
    if (typeof swRegistration !== "undefined" && swRegistration) {
      console.log(swRegistration);
      let convertedVapidKey = self.urlBase64ToUint8Array(
        "BMfzirqpnj_E-peR8tHHpJY-AEasiw1_2x-4HleDkmahysDv9hSRvtc8YPySLWMBmZeM2E8eWf7taNAAk2lLT4A"
      );
      swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        })
        .then(function(sub) {
          if (sub) {
            let mySub = JSON.parse(JSON.stringify(sub));
            console.log(mySub);
            self.updateSubscriptionOnServer(mySub);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
  syncData() {
    let self = this;
    if (!self.pouchInstance) return;
    self.pouchInstance
      .get("offline")
      .then(function(doc) {
        if (doc && doc.val && doc.val.length > 0) {
          for (let i = 0; i < doc.val.length; i++) {
            self.pushToServe(doc.val[i]);
          }
          self.pouchInstance
            .get("offline")
            .then(function(doc) {
              doc.val.length = 0;
              return self.pouchInstance.put({
                _id: "offline",
                _rev: doc._rev,
                val: doc.val
              });
            })
            .then(function(response) {})
            .catch(function(err) {});
        }
      })
      .catch(function(err) {});
  }
  pushToServe(obj) {
    let msg = "";
    let self = this;
    let result = this.http.post(obj.url, obj.data);
    result.subscribe(x => {
      self.router.navigate(["./"]);
      self.snackBar.open(
        "Your questions are synced to server",
        "Okay",
        {
          duration: 2000
        }
      );
    });
  }
}
