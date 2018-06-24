var DB =  require('../model/ItemManagerModel');

module.exports =function(wss){
    let webSocketServer = wss;

    let SendModificationsToClients = function(op,data){
        webSocketServer.getWss().clients.forEach(client => {
            if(client.OPEN == 1){
                client.send({
                    opCode : op,
                    result : data
                });
            }
        });
    };
    //Return an object 
    return {
        GetCategories : async(request,response)=>{
            try{
                var categories= await DB.GetCategories();
                
                response.json(categories);
            }
            catch(e){
                response.json([]);
            }
        },
        GetItems : async(request,response)=>{
            try{
                console.log("Getting Items " + request.params.categoryName);
                var items = await DB.GetItems(request.params.categoryName);
        
                response.json(items);
            }
            catch(e){
                response.json(e.message);
            }
        },
        AddCategory : async (request,response)=>{
            try{
                console.log("Adding category");
                var category = await DB.AddCategory(request.query.category);
                SendModificationsToClients('add_category',category);
                response.json(category);
            }
            catch(e){
                response.json(e.message);
            }
        },
        AddItem : async(request, response)=>{
            try{
                console.log("Adding item");
                var item = await DB.AddItem(request.params.categoryName,request.query.item);
                SendModificationsToClients('add_item',item);
                response.json(item);
            }
            catch(e){
                response.json(e.message);
            }
        },
        RemoveItem : async(request,response)=>{
            try{
                console.log("Removing item");
                var item = await DB.DeleteItem(request.params.categoryName,request.params.itemName);
                SendModificationsToClients('del_item',item);
                response.json(item);
            }
            catch(e){
                response.json(e.message);
            }
        },
        RemoveCategory : async(request,response)=>{
            try{
                console.log("Removing Category" + request.params.categoryName);
                var removed = await DB.DeleteCategory(request.params.categoryName);
                SendModificationsToClients('del_category',removed);
                response.json(removed);
            }
            catch(e){
                response.json(e.message);
            }
        },
        UpdateCategory : async(request,response)=>{
            try{
                console.log("Updating Category");
                var updated = await DB.UpdateCategory(request.params.categoryName,request.query.name);
                SendModificationsToClients('update_category',updated);
                response.json(updated);
            }
            catch(e){
                response.json(e.message);
            }
        },
        UpdateItem : async(request,response)=>{
            try{
                console.log("Updating Item");
                var updated = await DB.UpdateItem(request.params.categoryName,request.params.itemName,request.query.name);
                SendModificationsToClients('update_item',updated);
                response.json(updated);
            }
            catch(e){
                response.json(e.message);
            }
        }

    };
};
