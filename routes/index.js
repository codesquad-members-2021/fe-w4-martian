const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
<<<<<<< HEAD
<<<<<<< HEAD
  res.render('index.html');
=======
<<<<<<< HEAD
<<<<<<< HEAD
  res.render('index.html');
=======
  res.render('index');
>>>>>>> 06a80f4 (개발환경 구성 커밋)
=======
  res.render('index.html');
>>>>>>> aaa509b (view ejs 엔진을 사용하지 않고 html로 렌더)
>>>>>>> ac7d1f8 (-)
=======
  res.render('index.html');
>>>>>>> e26609e (git rebase 충돌로 인한 파일 업데이트)
});

module.exports = router;
