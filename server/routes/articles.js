var express = require('express');
var Article = require('../models/articles');
var Device = require("../models/devices");
var Question = require("../models/question");
var User = require("../models/profile");
var Tag = require("../models/tags");
var router = express.Router();
const webpush = require("web-push");
webpush.setGCMAPIKey(
  "AAAANpGvJoE:APA91bFP4eKWqatt5TonNL9QvB3jf5qkMJpvEhiIux_7EgSUxOrIq96pod-rJl76ZT84blmGGtgX4nYyCi-T9H4RILwD6wPN67A8kGTp-UN7ewexmTMlWux29oLgbKduitkvi9Ff9gRD"
);

const options = {
  gcmAPIKey:
    "AAAANpGvJoE:APA91bFP4eKWqatt5TonNL9QvB3jf5qkMJpvEhiIux_7EgSUxOrIq96pod-rJl76ZT84blmGGtgX4nYyCi-T9H4RILwD6wPN67A8kGTp-UN7ewexmTMlWux29oLgbKduitkvi9Ff9gRD",
  vapidDetails: {
    subject: "mailto:prituppalapati@gmail.com",
    publicKey:
      "BMfzirqpnj_E-peR8tHHpJY-AEasiw1_2x-4HleDkmahysDv9hSRvtc8YPySLWMBmZeM2E8eWf7taNAAk2lLT4A",
    privateKey: "LHfvjLVhhvOrhdluC2Kn791-xRhjuSKQS9Zx7cjz1UY"
  },
  TTL: 10,
  headers: {}
};

router.get('/articles', function(req, res) {
  Article.find({}, function(err, docs) {
    if (err) {
      console.log(err);
    }
    res.send(docs);
  });
});

router.get("/article", function(req, res) {
  Question.findOne({ _id: req.query.id })
    .populate("tags")
    .populate("user")
    .populate("comments.postedBy")
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      if (doc) {
        res.send(doc);
      } else {
        res.send({});
      }
    });
});

router.get("/userprofile", function(req, res) {
  User.findOne({ _id: req.query.id })
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      if (doc) {
        res.send(doc);
      } else {
        res.send({});
      }
    });
});

router.get("/getuserquestions", function(req, res) {
  Question.find({ user: req.query.id })
    .populate("user")
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      if (doc) {
        res.send(doc);
      } else {
        res.send({});
      }
    });
});
router.get("/getTags", function(req, res) {
  Tag.find({})
    .populate("questions")
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      if (doc) {
        res.send(doc);
      } else {
        res.send({});
      }
    });
});


router.post('/add', function(req, res) {
      var article = new Article({
        title: req.body.title,
        description: req.body.description
      });
      article.save(function(err, saved) {
        if (err) {
          console.log(err);
        } else {
          var obj=JSON.parse(JSON.stringify(saved));
          res.send(saved);
        }
      });
  
});

router.post("/ask", function(req, res) {
  var article = new Question({
    title: req.body.question,
    description: req.body.description,
    user: req.body.user,
    code: req.body.code
  });
  article.save(function(err, saved) {
    if (err) {
      console.log(err);
    } else {
      var userD = JSON.parse(JSON.stringify(saved));
      // sendNotification(obj._id, obj.title);
      res.send(saved);
      if(req.body.intrestes && req.body.intrestes.length>0){
        for (var i = 0; i < req.body.intrestes.length; i++) {
          var intrest = req.body.intrestes[i];
          (function(intrest) {
            Tag.findOneAndUpdate({ name: intrest }, { $push: { questions: userD._id } }, { new: true }).exec(
              function(err, doc) {
                if (err) {
                }
                if (doc) {
                  var tagid = JSON.parse(JSON.stringify(doc));
                  Question.findOneAndUpdate(
                    { _id: userD._id },
                    { $push: { tags: tagid._id } },
                    { new: true }
                  ).exec(function(err, doc) {
                    if (err) {
                      console.log(err);
                    }
                  });
                } else {
                  var tagUp = [];
                  tagUp.push(userD._id);
                  var tag = new Tag({ name: intrest, questions:tagUp});
                  tag.save(function(err, saved) {
                    var id = JSON.parse(JSON.stringify(saved));
                    Question.findOneAndUpdate(
                      { _id: userD._id },
                      { $push: { tags: id._id } },
                      { new: true }
                    ).exec(function(err, doc) {
                      if (err) {
                        console.log(err);
                      }
                      // res.send(doc);
                    });
                  });
                }
              }
            );
          })(intrest);
        }
      }
    }
  });
});

router.post("/article/comment", function(req, res) {
  Question.findOneAndUpdate({ _id: req.body.question }, { $push: { comments: { text: req.body.comment, postedBy: req.body.user } } }, { new: true })
    .populate("comments.postedBy")
    .populate("user")
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      res.send(doc);
      var a = JSON.parse(JSON.stringify(doc));
      sendNotification(a._id, a.title,a.user.subscription);
    });
});

router.post("/login", function(req, res) {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    function(err, doc) {
      if (err) {
        console.log(err);
      }
      var obj = {};
      if (doc) {
        var user = JSON.parse(JSON.stringify(doc));
        obj = {
          code: 200,
          msg: "Logged In",
          obj: user
        };
        res.send(obj);
      } else {
        obj = {
          code: 200,
          valMsg: "Invalid Credentials"
        };
        res.send(obj);
      }
    }
  );
});

router.post("/likecomment", function(req, res) {
  Question.findOneAndUpdate(
    { _id: req.body.questionId, "comments._id": req.body.commentId },
    {
      $push: {
        "comments.$.likes": req.body.usedId
      }
    },
    { new: true }
  )
    .populate("comments.postedBy")
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      res.send(doc);
    });
});



router.post("/likequestion", function(req, res) {
  Question.findOneAndUpdate(
    { _id: req.body.questionId },
    {
      $push: {
        "likes": req.body.userId
      }
    },
    { new: true }
  )
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      res.send(doc);
      changePoints(req.body.userId,1);
    });
});
router.post("/dislikequestion", function(req, res) {
  Question.findOneAndUpdate(
    { _id: req.body.questionId },
    {
      $push: {
        dislikes: req.body.userId
      }
    },
    { new: true }
  ).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    res.send(doc);
    changePoints(req.body.userId, -1);
  });
});

function changePoints(user,val){
  User.findOneAndUpdate({ _id: user }, { $inc: { points: val } }).exec(
    function(err, user) {
      if (err) {
        console.log(err);
      }
      var userD=JSON.parse(JSON.stringify(user));
      if (userD.points == 20) {
        sendBadgeNotification("bronze", userD.subscription);
      } else if (userD.points == 40) {
        sendBadgeNotification("silver", userD.subscription);
      } else if (userD.points == 60) {
        sendBadgeNotification("gold", userD.subscription);
      }
    }
  );
}

function sendBadgeNotification(title,subscription) {
  var obj = { doc: { title: title, id: null }, type: "badge" };
  if (subscription && subscription.length){
    for (var k = 0; k < subscription.length; k++) {
      if (subscription[k].endpoint && subscription[k].auth) {
        var pushSubscription = { endpoint: subscription[k].endpoint, keys: { auth: subscription[k].auth, p256dh: subscription[k].p256dh } };
        webpush
          .sendNotification(
            pushSubscription,
            JSON.stringify(obj),
            options
          )
          .then(function(err) {
            console.log(err);
          });
        // webpush.sendNotification(pushSubscription, 'Your Push Payload Text').then(function(res){console.log(res)});
      }
    }
  } 
}

router.get("/getRecentPosts", function(req, res) {
  Question.find({})
    .sort("-modifieddate")
    .populate("user")
    .exec(function(err, docs) {
      if (err) {
      }
      res.send(docs);
    });
});

router.post("/dislikecomment", function(req, res) {
  Question.findOneAndUpdate(
    { _id: req.body.questionId, "comments._id": req.body.commentId},
    {
      $push: {
        "comments.$.dislikes": req.body.usedId
      }
    },
    { new: true }
  )
    .populate("comments.postedBy")
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      }
      res.send(doc);
    });
});

router.post("/register", function(req, res) {
  User.findOne({ username: req.body.email }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (doc) {
      var obj = {
        code: 200,
        valMsg: "username already exists"
      };
      res.send(obj);
    } else {
      var user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        location: req.body.location,
        designation: req.body.designation,
        points: 0,
        intrests: []
      });
      user.save(function(err, saved) {
        if (err) {
          console.log(err);
        } else {
          var userD = JSON.parse(JSON.stringify(saved));
          var obj = {
            code: 200,
            msg: "Registered",
            obj: userD
          };
          res.send(obj);
          if (req.body.interests && req.body.interests.length) {
            for (var i = 0; i < req.body.interests.length; i++) {
              var intrest = req.body.interests[i];
              (function(intrest) {
                Tag.findOne({ name: intrest }, function(err, doc) {
                  if (err) {
                  }
                  if (doc) {
                    var tagid = JSON.parse(JSON.stringify(doc));
                    User.findOneAndUpdate({ _id: userD._id }, { $push: { intrests: tagid._id } }, { new: true }).exec(
                      function(err, doc) {
                        if (err) {
                          console.log(err);
                        }
                      }
                    );
                  } else {
                    var tag = new Tag({ name: intrest });
                    tag.save(function(err, saved) {
                      var id = JSON.parse(JSON.stringify(saved));
                      User.findOneAndUpdate({ _id: userD._id }, { $push: { intrests: id._id } }, { new: true }).exec(
                        function(err, doc) {
                          if (err) {
                            console.log(err);
                          }
                          // res.send(doc);
                        }
                      );
                    });
                  }
                });
              })(intrest);
            }
          }
        }
      });
    }
  });
});

router.post("/subscription", function(req, res) {
  User.findOne({ _id: req.body.user,"subscription.endpoint": req.body.endPoint }, function(err, doc) {
    if (err) {
      console.log(err);
    }
    if (!doc) {
      User.findOneAndUpdate({ _id: req.body.user }, { $push: { subscription: { endpoint: req.body.endPoint, p256dh: req.body.keys.p256dh, auth: req.body.keys.auth } } }, { new: true }).exec(
        function(err, doc) {
          if (err) {
            console.log(err);
          }
        }
      );
    } else {
      var obj = JSON.parse(JSON.stringify(doc)); 
      if(obj.subscription && obj.subscription.length ==0){
        User.findOneAndUpdate({ _id: req.body.user }, { $push: { subscription: { endpoint: req.body.endPoint, p256dh: req.body.keys.p256dh, auth: req.body.keys.auth } } }, { new: true }).exec(
          function(err, doc) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
  });
});

function sendNotification(id,title,subscription){
  console.log(id);
  var obj = { doc: {
    title:title,
    id:id
  }, type: 'article' };
  if (subscription && subscription.length>0){
    var arr = JSON.parse(JSON.stringify(subscription));
    for (var k = 0; k < arr.length; k++) {
      if (arr[k].endpoint && arr[k].auth) {
        var pushSubscription = { endpoint: arr[k].endpoint, keys: { auth: arr[k].auth, p256dh: arr[k].p256dh } };
        webpush
          .sendNotification(pushSubscription, JSON.stringify(obj), options)
          .then(function(err) {
            console.log(err);
          });
        // webpush.sendNotification(pushSubscription, 'Your Push Payload Text').then(function(res){console.log(res)});
      }
    }
  } 
}

module.exports = router;
