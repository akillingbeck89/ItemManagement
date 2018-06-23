module.exports = function(app){

    var controller = require('../controller/ItemManagerController');

    app.route('/categories')
    .get(controller.GetCategories)
    .post(controller.AddCategory);

    app.route('/categories/:categoryName')
    .delete(controller.RemoveCategory)
    .put(controller.UpdateCategory).get(controller.GetItems)
    .post(controller.AddItem);


    app.route('/categories/:categoryName/:itemName')
    .delete(controller.RemoveItem)
    .put(controller.UpdateItem);


};