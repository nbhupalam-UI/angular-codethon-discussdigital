import { Component } from "@angular/core";
import { ArticlesService } from "./articles.service";

declare var PouchDB: any;

@Component({
  selector: "article",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.scss"]
})
export class ArticlesComponent {
  title = "";
  description = "";
  articles: Array<any>;
  popularArticles: Array<any>;
  pouchInstance: any;
  constructor(private _articlesService: ArticlesService) {
    this.getRecentArticles();
    this.getTags();
    if (window.indexedDB) {
      this.pouchInstance = new PouchDB("meanboiler");
    }
  }
  tags: any;
  getTags(): void {
    var self = this;
    var tags = self._articlesService.getTags();
    tags.subscribe(
      x => {
        if (x && x.length > 0) {
          self.tags = x;
          self.addToLocalDB("tags", self.tags);
        }
      },
      err => {
        if (!self.pouchInstance) return;
        self.pouchInstance;
        self.pouchInstance
          .get("tags")
          .then(function(doc) {
            self.tags = doc.val;
          })
          .then(function(response) {})
          .catch(function(err) {
            console.log(err);
          });
      }
    );
  }
  getRecentArticles() {
    var self = this;
    var recentArticles = this._articlesService.getRecentArticles();
    recentArticles.subscribe(
      x => {
        if (x && x.length > 0) {
          self.articles = x;
          self.addToLocalDB("articles", self.articles);
          let b = JSON.parse(JSON.stringify(x));
          self.popularArticles = b.sort(function(a, b) {
            return b.likes.length - a.likes.length;
          });
          self.addToLocalDB("popularArticles", self.popularArticles);
        }
      },
      err => {
        if (!self.pouchInstance) return;
        self.pouchInstance;
        self.pouchInstance
          .get("articles")
          .then(function(doc) {
            self.articles = doc.val;
          })
          .then(function(response) {})
          .catch(function(err) {
            console.log(err);
          });
        this.pouchInstance
          .get("popularArticles")
          .then(function(doc) {
            self.popularArticles = doc.val;
          })
          .then(function(response) {})
          .catch(function(err) {
            console.log(err);
          });
      }
    );
  }
  getArticles() {
    let self = this;
    this._articlesService.getAllArticles().subscribe(
      x => {
        if (x && x.length > 0) {
          self.articles = x;
          self.addToLocalDB("articles", self.articles);
        }
      },
      err => {
        if (!self.pouchInstance) return;
        self.pouchInstance
          .get("articles")
          .then(function(doc) {
            self.articles = doc.val;
          })
          .then(function(response) {})
          .catch(function(err) {
            console.log(err);
          });
      }
    );
  }
  tagsQuestion:any;
  getTagsQuestions(item: any) {
    this.tagsQuestion = item.questions;
  }
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
              .put({ _id: id, val: self.articles })
              .then(function(response) {})
              .catch(function(err) {
                console.log(err);
              });
          }
        });
    }
  }
  submit() {
    var self = this;
    if (this.title && this.description) {
      this._articlesService
        .addArticle({ title: this.title, description: this.description })
        .subscribe(
          x => {
            self.title = "";
            self.description = "";
            self.getRecentArticles();
          },
          err => {
            let offLine: any = {};
            offLine.url = "/api/add";
            offLine.data = { title: self.title, description: self.description };
            offLine.type = "article";
            if (!self.pouchInstance) return;
            self.pouchInstance
              .get("offline")
              .then(function(doc) {
                doc.val.push(offLine);
                return self.pouchInstance.put({
                  _id: "offline",
                  _rev: doc._rev,
                  val: doc.val
                });
              })
              .then(function(response) {})
              .catch(function(err) {
                if (err.status == 404) {
                  self.pouchInstance
                    .put({ _id: "offline", val: self.articles })
                    .then(function(response) {})
                    .catch(function(err) {
                      console.log(err);
                    });
                }
              });
          }
        );
    }
  }
}
