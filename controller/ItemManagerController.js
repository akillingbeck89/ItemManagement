
//GET
exports.GetCategories = function(request,response){

    console.log("Category");
    response.send("GetCategories");
};

exports.GetItems = function(request,response){
    response.send("GetItems");
};

//POST
exports.AddCategory = function (request,response){
    response.send("AddCategory");
};

exports.AddItem = function(request, response){
    response.send("AddItem");
};

//DELETE
exports.RemoveItem = function(request,response){
    response.send("RemoveItem");
};

exports.RemoveCategory = function(request,response){
    response.send("RemoveCategory");
};

//PUT
exports.UpdateCategory = function(request,response){
    response.send("UpdateCategory");
};

exports.UpdateItem = function(request,response){
    response.send("UpdateItem");
};