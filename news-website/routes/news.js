const express = require("express");
const router = express.Router();
router.use(express.json());
var newsController = require('../controllers/newsController.js');


//get all news
router.get('/', async (req, res, next) => {
  try {
    const result = await newsController.readAllNews();
    res.render('news', { title: 'All', news: result });
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
    res.render('news', { title: categoryName, news: result} );
  } catch (err) {
    next(err);
  }
});


// get news by id 
router.get('/:id', async (req, res, next) => {
  const newsId = req.params.id;
  try {
    const result = await newsController.readNewsById(newsId);
    res.render('readNews', { news: result} );
  } catch (err) {
    next(err);
  }
});


module.exports = router;