const express = require("express");
const router = express.Router();
router.use(express.json());
var categoryController = require('../controllers/categoryController.js');



//get all categories
router.get('/', async (req, res, next) => {
    try {
        const result = await categoryController.getAllCategories();
        res.render('adminCategories', { categories: result });
    } catch (err) {
        next(err);
    }
});

// Get category by id
router.get('/:id', async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        const category = await categoryController.getCategoryById(categoryId);
        // res.status(200).json(category);
        // res.render('categories', {title: 'Categories', categories: result });
        res.render('category', { title: `Category: ${category.title}`, category });
    } catch (err) {
        next(err);
    }
});

router.get('/updatePage/:id', async (req, res, next) => {
    const Id = req.params.id;
    try {
        const result = await categoryController.getCategoryById(Id);
        res.render('updateCategory', { category: result });
    } catch (err) {
        next(err);
    }
});


router.get('/createPage/add', async (req, res, next) => {
    try {
        res.render('createCategory');
    } catch (err) {
        next(err);
    }
});

router.post('/create', async (req, res, next) => {
    const { title, description } = req.body;
    try {
        if (!title || !description) {
            throw new Error('All fields must be filled');
        }
        const newCategory = await categoryController.createCategory(title, description);
        res.redirect('/adminCategories');
    } catch (err) {
        next(err);
    }
});
// Update a category
router.post('/update/:id', async (req, res, next) => {
    const categoryId = req.params.id;
    const { title, description } = req.body;
    try {
        if (!title || !description) {
            throw new Error('All fields must be filled');
        }
        const updatedCategory = await categoryController.updateCategory(categoryId, title, description);
        res.redirect('/adminCategories');
    } catch (err) {
        next(err);
    }
});

// Delete a category
router.post('/delete/:id', async (req, res, next) => {
    const id  = req.params.id;
    try {
        await categoryController.deleteCategory(id);
        res.redirect('/adminCategories');
    } catch (err) {
        next(err);
    }
});

// router.delete('/:id', async (req, res, next) => {
//     const categoryId = req.params.id;
//     try {
//         await categoryController.deleteCategory(categoryId);
//         res.status(204).end();
//     } catch (err) {
//         next(err);
//     }
// });

module.exports = router;
