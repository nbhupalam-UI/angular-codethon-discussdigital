import { Component, OnInit } from "@angular/core";
import { ArticleService } from "./article.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material";

declare var PouchDB: any;

@Component({
  selector: "article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit {
  id;
  article: any;
  showComment = false;
  userComment;
  pouchInstance: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _articleService: ArticleService,
    public snackBar: MatSnackBar
  ) {
    if (window.indexedDB) {
      this.pouchInstance = new PouchDB("meanboiler");
    }
  }

  addComment() {
    this.showComment = true;
  }
  postComment() {
    var userData: any = localStorage.getItem("userData");
    if (userData && userData != "undfined" && userData != null) {
      userData = JSON.parse(userData);
      var comment = this._articleService.postComment({
        comment: this.userComment,
        user: userData._id,
        question: this.id
      });
      comment.subscribe(x => {
        if (x) {
          this.userComment = "";
          var question = this._articleService.getArticle(this.id);
          question.subscribe(x => {
            this.article = x;
          });
        }
      });
    } else {
      this.snackBar.open('Please login to proceed', "Okay", { duration: 2000 });
    }
  }

  dislikeComment(item) {
    var user = localStorage.getItem("userData");
    if (user && user != null) {
      var userData: any = JSON.parse(user);
      let likeComment = this._articleService.dislikeComment({
        commentId: item._id,
        questionId: this.id,
        usedId: this.article.user._id
      });
      likeComment.subscribe(x => {
        if (x) {
          var article = this._articleService.getArticle(this.id);
          article.subscribe(x => {
            this.article = x;
          });
        }
      });
    } else {
      this.snackBar.open('Please login to proceed', "Okay", { duration: 2000 });
    }
  }
  dislikeQuestion(item) {
    var user = localStorage.getItem("userData");
    if (user && user != null) {
      var userData: any = JSON.parse(user);
      let likeComment = this._articleService.dislikeQuestion({
        questionId: this.id,
        userId: this.article.user._id
      });
      likeComment.subscribe(x => {
        if (x) {
          var article = this._articleService.getArticle(this.id);
          article.subscribe(x => {
            this.article = x;
          });
        }
      });
    } else {
      this.snackBar.open('Please login to proceed', "Okay", { duration: 2000 });
    }
  }
  likeQuestion(item) {
    var user = localStorage.getItem("userData");
    if (user && user != null) {
      var userData: any = JSON.parse(user);
      let likeComment = this._articleService.likeQuestion({
        questionId: this.id,
        userId: this.article.user._id
      });
      likeComment.subscribe(x => {
        if (x) {
          var article = this._articleService.getArticle(this.id);
          article.subscribe(x => {
            this.article = x;
          });
        }
      });
    } else {
      this.snackBar.open('Please login to proceed', "Okay", { duration: 2000 });
    }
  }
  likeComment(item) {
    var user = localStorage.getItem("userData");
    if (user && user != null) {
      var userData: any = JSON.parse(user);
      let likeComment = this._articleService.likeComment({
        commentId: item._id,
        questionId: this.id,
        usedId: this.article.user._id
      });
      likeComment.subscribe(x => {
        if (x) {
          var article = this._articleService.getArticle(this.id);
          article.subscribe(x => {
            this.article = x;
          });
        }
      });
    } else {
      this.snackBar.open('Please login to proceed', "Okay", { duration: 2000 });
    }
  }
  ngOnInit() {
    let question = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get("id");
        return this._articleService.getArticle(this.id);
      })
    );
    question.subscribe(
      c => {
        this.article = c;
      },
      err => {
        let self = this;
        if (!self.pouchInstance) return;
        this.pouchInstance
          .get("articles")
          .then(function (doc) {
            self.article = doc.val.find(function (element: any) {
              if (element._id == self.id) return element;
            });
          })
          .then(function (response) { })
          .catch(function (err) {
            console.log(err);
          });
      }
    );
  }
}
