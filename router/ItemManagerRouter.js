module.exports = function(app,wss){

    var expressWs = require('express-ws')(app);
    var controller = require('../controller/ItemManagerController')(expressWs);

     app.route('/categories')
    .get(controller.GetCategories)
    .post(controller.AddCategory);

    app.route('/categories/:categoryName')
    .delete(controller.RemoveCategory)
    .put(controller.UpdateCategory)
    .get(controller.GetItems)
    .post(controller.AddItem);


    app.route('/categories/:categoryName/:itemName')
    .delete(controller.RemoveItem)
    .put(controller.UpdateItem);

    app.use(function (req, res, next) {
        return next();
      });

      
      app.get('/', function(req, res, next){
        console.log('get route', req.testing);
        expressWs.getWss().clients.forEach(function(client){
           if(client.OPEN==1){
               client.send("Fuck off");
           }
        });
        res.end();
      });
      
      app.ws('/', function(ws, req) {
          
      });

};