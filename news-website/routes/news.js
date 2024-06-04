const express = require("express");
const router = express.Router();
router.use(express.json());
var newsController = require('../controllers/newsController.js');


//get all news
router.get('/', async (req, res, next) => {
  try {
    const result = await newsController.readAllNews();
    res.render('news', { title: 'all', news: result });
    res.status(201).json({ message: 'News read successfully'});
  } catch (err) {
    next(err);
  }
});

// get news by category
router.get('/:title', async (req, res, next) => {
  const categoryName = req.params.title;
  try {
    const result = await newsController.readNewsByCategory(categoryName);
    res.render('news', { title: categoryName, news: Array.isArray(result) ? result : [result], isSingleNews: false });
  } catch (err) {
    next(err);
  }
});


// get news by id 
router.get('/:title/:id', async (req, res, next) => {
  const newsId = req.params.id;
  try {
    const result = await newsController.readNewsById(newsId);
    
    res.render('news', { title: `News ${newsId}`, news: Array.isArray(result) ? result : [result], isSingleNews: true });
  } catch (err) {
    next(err);
  }
});


module.exports = router;