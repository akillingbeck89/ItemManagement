var DB =  require('../model/ItemManagerModel');
//GET
exports.GetCategories = async(request,response)=>{

    try{
        console.log("Getting categories");
        var categories= await DB.GetCategories();

        response.json(categories);
    }
    catch(e){
        response.json(e.message);
    }
};

exports.GetItems = async(request,response)=>{
    try{
        console.log("Getting Items " + request.params.categoryName);
        var items = await DB.GetItems(request.params.categoryName);

        response.json(items);
    }
    catch(e){
        response.json(e.message);
    }
};

//POST
exports.AddCategory = async (request,response)=>{
    try{
        console.log("Adding category");
        var category = await DB.AddCategory(request.query.category);

        response.json(category);
    }
    catch(e){
        response.json(e.message);
    }
};

exports.AddItem = async(request, response)=>{
    try{
        console.log("Adding item");
        var item = await DB.AddItem(request.params.categoryName,request.query.item);

        response.json(item);
    }
    catch(e){
        response.json(e.message);
    }
};

//DELETE
exports.RemoveItem = async(request,response)=>{
    try{
        console.log("Removing item");
        var item = await DB.DeleteItem(request.params.categoryName,request.params.itemName);

        response.json(item);
    }
    catch(e){
        response.json(e.message);
    }
};

exports.RemoveCategory = async(request,response)=>{
    try{
        console.log("Removing Category" + request.params.categoryName);
        var removed = await DB.DeleteCategory(request.params.categoryName);

        response.json(removed);
    }
    catch(e){
        response.json(e.message);
    }
};

//PUT
exports.UpdateCategory = async(request,response)=>{
    try{
        console.log("Updating Category");
        var updated = await DB.UpdateCategory(request.params.categoryName,request.query.name);

        response.json(updated);
    }
    catch(e){
        response.json(e.message);
    }
};

exports.UpdateItem = async(request,response)=>{
    try{
        console.log("Updating Item");
        var updated = await DB.UpdateItem(request.params.categoryName,request.params.itemName,request.query.name);

        response.json(updated);
    }
    catch(e){
        response.json(e.message);
    }
};