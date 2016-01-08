var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
	res.render('../public/modules/config/view/index', {
		isAuthenticated: req.isAuthenticated(),
		userInfo: req.user,
		query: {}
	});
});

module.exports = router;
