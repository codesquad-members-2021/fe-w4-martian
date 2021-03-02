const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('index', {title: "마션 : 16진수기반 송수신기"});
});

module.exports = router;