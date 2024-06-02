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

//create news
router.post('/', async (req, res, next) => {
  const { title, content, authorId } = req.body;
  try {
    const newsData = [title, content, authorId];
    const result = await newsController.createNews(newsData, authorId);
    res.status(201).json({ message: 'News created successfully', newsId: result.createdNewsId });
  } catch (err) {
    next(err);
  }
});

// update news
router.patch('/:id', async (req, res, next) => {
  const newsId  = req.params.id;
  const { title, content, authorId } = req.body;
  try {
    const newsData = [title, content, authorId];
    await newsController.updateNews(newsData, newsId);
    res.json({ message: 'News updated successfully', newsId});
  } catch (err) {
    next(err);
  }
});

// update with rollbacck
// router.patch('/:id/rollback', async (req, res, next) => {
//   const newsid  = req.params.id;
//   const { title, content, authorId } = req.body;
//   try {
//     const newsData = [title, content, authorId];
//     await newsController.updateWithRollback(newsData, newsid);
//     res.json({ message: 'News updated successfully', newsId});
//   } catch (err) {
//     next(err);
//   }
// });

// delete news

router.delete('/:id', async (req, res, next) => {
  const newsid  = req.params.id;
  try {
    await newsController.deleteNews(newsid); 
    res.json({ message: 'News deleted successfully', newsid});
  } catch (err) {
    next(err);
  }
});

module.exports = router;