import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./profile.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
declare var PouchDB: any;

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {
  pouchInstance;
  constructor(public _profileService: ProfileService) {
    this.getUserProfile();
    this.getUserQuestion();
    if (window.indexedDB) {
      this.pouchInstance = new PouchDB("meanboiler");
    }
  }
  profile: any = {};
  addToLocalDB(id, val) {
    if (val && val.length > 0) {
      let self = this;
      let msg = "";
      if (!self.pouchInstance) return;
      self.pouchInstance
        .get(id)
        .then(function(doc) {
          return self.pouchInstance.put({
            _id: id,
            _rev: doc._rev,
            val: val
          });
        })
        .then(function(response) {})
        .catch(function(err) {
          if (err.status == 404) {
            self.pouchInstance
              .put({ _id: id, val: self.profile })
              .then(function(response) {})
              .catch(function(err) {
                console.log(err);
              });
          }
        });
    }
  }
  getUserProfile() {
    let user = localStorage.getItem("userData");
    if (user && user != null) {
      var userId = JSON.parse(user)._id;
      var profile = this._profileService.getUserProfile(userId);
      profile.subscribe(
        x => {
          let self = this;
          self.profile = x;
          self.addToLocalDB("profile", self.profile);
        },
        err => {
          let self = this;
          if (!self.pouchInstance) return;
          self.pouchInstance;
          self.pouchInstance
            .get("profile")
            .then(function(doc) {
              self.profile = doc.val;
            })
            .then(function(response) {})
            .catch(function(err) {
              console.log(err);
            });
        }
      );
    }
  }
  questions: any;
  getUserQuestion() {
    let user = localStorage.getItem("userData");
    if (user && user != null) {
      var userId = JSON.parse(user)._id;
      var profile = this._profileService.getUserQuestions(userId);
      profile.subscribe(x => {
        this.questions = x;
      });
    }
  }
}
