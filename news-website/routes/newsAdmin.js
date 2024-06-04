const express = require("express");
const router = express.Router();
router.use(express.json());
var newsController = require('../controllers/newsController.js');


//get all news
router.get('/', async (req, res, next) => {
  try {
    const result = await newsController.readAllNews();
    res.render('adminNews', { news: result });
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

router.get('/updatePage/:id', async (req, res, next) => {
  const Id = req.params.id;
  try {
    const result = await newsController.readNewsById(Id);
    res.render('updateNews', { news: result });
  } catch (err) {
    next(err);
  }
});

// update news
router.post('/update/:id', async (req, res, next) => {
  const newsId = req.params.id;
  const { title, content, authorId, categoryId } = req.body;
  try {
    const newsData = [title, content, authorId, categoryId ]; // Pass the data as an array
    await newsController.updateNews(newsData, newsId);
    const result = await newsController.readAllNews();
    res.render('adminNews', { news: result });
  } catch (err) {
    next(err);
  }
});


// router.post('/update/:id', async (req, res, next) => {
//   const newsId = req.params.id;
//   const { title, content, authorId } = req.body;
//   try {
//     const newsData = { title, content, authorId };
//     await newsController.updateNews(newsData, newsId);
//     res.json({ message: 'News updated successfully', newsId });
//   } catch (err) {
//     next(err);
//   }
// });

// router.patch('/:id', async (req, res, next) => {
//   const newsId  = req.params.id;
//   const { title, content, authorId } = req.body;
//   try {
//     const newsData = [title, content, authorId];
//     await newsController.updateNews(newsData, newsId);
//     res.json({ message: 'News updated successfully', newsId});
//   } catch (err) {
//     next(err);
//   }
// });

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
router.post('/delete/:id', async (req, res, next) => {
  const id  = req.params.id;
  try {
    await newsController.deleteNews(id);
    const result = await newsController.readAllNews();
    res.render('adminNews', { news: result });
    res.json({ message: 'News deleted successfully', id});
  } catch (err) {
    next(err);
  }
});

// router.delete('/:id', async (req, res, next) => {
//   const newsid  = req.params.id;
//   try {
//     await newsController.deleteNews(newsid);
//     res.json({ message: 'News deleted successfully', newsid});
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;