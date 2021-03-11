import { Component, OnInit } from "@angular/core";
import { AskService } from "./ask.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
declare var PouchDB: any;
declare var swRegistration: any;
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "ask",
  templateUrl: "./ask.component.html",
  styleUrls: ["./ask.component.scss"],
  providers: [AskService]
})
export class AskComponent implements OnInit {
  intrestes: Array<any> = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  pouchInstance: any;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  question = "";
  description = "";
  code = "";

  constructor(
    private http: HttpClient,
    public _askService: AskService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    if (window.indexedDB) {
      this.pouchInstance = new PouchDB("meanboiler");
    }
  }
  ngOnInit() {
    var user: any = localStorage.getItem("userData");
    if (!user) {
      this.router.navigate([""]);
    }
    this.pushInitialize();
  }
  updateSubscriptionOnServer(subscription) {
    let obj: any = {};
    obj.endPoint = subscription.endpoint;
    obj.keys = {};
    obj.keys.p256dh = subscription.keys.p256dh;
    obj.keys.auth = subscription.keys.auth;
    var user = localStorage.getItem("userData");
    if (user && user != null) {
      var userId = JSON.parse(user)._id;
      obj.user = userId;
      let result = this.http.post(`/api/subscription`, obj).subscribe(x => {
        console.log(x);
      });
    }
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
  ask() {
    var a = document.querySelector(".code-preview");
    var code_ed;
    if (a && a.innerHTML && this.code) {
      code_ed = a.innerHTML;
    }
    var user: any = localStorage.getItem("userData");
    if (user) {
      var user = JSON.parse(user);
      var ask = this._askService.ask({
        question: this.question,
        description: this.description,
        intrestes: this.intrestes,
        code: code_ed,
        user: user._id
      });
      ask.subscribe(
        x => {
          let self = this;
          if (x && x._id) {
            self.snackBar.open("Your Question has been Posted", "Okay", {
              duration: 2000
            });
            this.router.navigate([`./article/${x._id}`]);
          }
        },
        err => {
          let self = this;
          let offLine: any = {};
          offLine.url = "/api/ask";
          offLine.data = { question: this.question, description: this.description, intrestes: this.intrestes, code: code_ed, user: user._id };
          offLine.type = "article";
          if (!self.pouchInstance) return;
          self.pouchInstance
            .get("offline")
            .then(function(doc) {
              doc.val.push(offLine);
              self.snackBar.open(
                "Your question will be posted when your device is online",
                "Okay",
                {
                  duration: 2000
                }
              );
              return self.pouchInstance.put({
                _id: "offline",
                _rev: doc._rev,
                val: doc.val
              });
              
            })
            .then(function(response) {})
            .catch(function(err) {
              var a:any=[];
              a.push(offLine);
              self.pouchInstance
                .put({ _id: "offline", val: a })
                .then(function(response) {})
                .catch(function(err) {
                  console.log(err);
                });
            });
        }
      );
    }
  }
  customTrackBy(index: number, obj: any): any {
    return index;
  }

  addintrestes() {
    this.intrestes.push("");
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.intrestes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(interest: any): void {
    let index = this.intrestes.indexOf(interest);

    if (index >= 0) {
      this.intrestes.splice(index, 1);
    }
  }
}
