//Just going to use an "in memory" DB for now


let CategoryNotFound = function(){
    return "Category not found";
}

let ItemNotFound = function(){
    return "Item not found";
}
function Item(name){
    this.name = name;
}

function Category(name){
    this.name = name;
    this.items = [];

    this.findItemByName = async(name)=>{
        return this.items.find(function(element){return element.name === name;});
    };
    this.AddItem = async(item)=>{
        var have = await this.findItemByName(item);
        if(!have){
            var newItem = new Item(item);
            this.items.push(newItem);
            return newItem;
        }

        throw new Error("Item already Exists");
    };
    this.RemoveItem = async(item)=>{
        let index =this.items.indexOf(item);
        if(index > -1){
            this.items.splice(index,1);
            return true;
        }
        else{
            throw new Error(ItemNotFound());
        }
    };
    this.UpdateItem = async(item)=>{
        let index = this.items.indexOf(item);
        if(index > -1){
            this.items[index] = item;
        }
        else{
            throw new Error(ItemNotFound());
        }
    };
    this.GetItems = async()=>{
        if(this.items.length > 0){
            return this.items;
        }
        else{
            throw new Error("No items");
        }
        
    };
}


function DbAccess(){

    this.categories = [];

    this.findCategoryByName = async(name)=>{
        return this.categories.find(function(element){return element.name === name;});
    };
    this.GetCategories = async()=>{
        if(this.categories && this.categories.length > 0)
        {
            return this.categories;
        }
        else{
            throw new Error("No Categories!");
        }
    };
    this.GetItems = async(categoryName)=>{
        var category = await this.findCategoryByName(categoryName);
        
            if(category){
                return await category.GetItems();
            }
            else{
                throw new Error(CategoryNotFound());
            }
    };

    this.AddCategory = async(name)=>{
        var have = await this.findCategoryByName(name);
        if(!have){
            let newCategory = new Category(name);
            this.categories.push(newCategory);
            return newCategory;
        }
        else{
            throw new Error("Category already exists!");
        }
        
    };

    this.AddItem = async(toCategory,item)=>{
        
        try{
            var category = await this.findCategoryByName(toCategory);
            if(!category){
                throw new Error(CategoryNotFound());
            }
            var item = await category.AddItem(item);

            return item;
        }
        catch(e){
           throw e;
        }
    };

    this.UpdateCategory =async(name,newName)=>{

        try{
            var category = await this.findCategoryByName(name);
            if(!category){
                throw new Error(CategoryNotFound());
            }

            category.name = newName;

            return category;
        }
        catch(e){
            throw new Error(e);
        }

    };

    this.UpdateItem =async(category,item,newItemName)=>{

        try{
            var category = await this.findCategoryByName(category);
            if(!category){
                throw new Error(CategoryNotFound());
            }

            var item = await category.findItemByName(item);
            if(!item){
                throw new Error(ItemNotFound());
            }

            item.name = newItemName;

            return item;
        }
        catch(e){
            throw new Error(e);
        }

    };

    this.DeleteCategory = async(categoryName)=>{
        try{
            var category = await this.findCategoryByName(categoryName);
            if(!category){
                throw new Error(CategoryNotFound());
            }
            let index = this.categories.indexOf(category);
            this.categories.splice(index,1);

            return "Deleted";
        }
        catch(e){
            throw e;
        }
    };

    this.DeleteItem = async(categoryName,itemName)=>{
        try{
            var category = await this.findCategoryByName(categoryName);
            if(!category){
                throw new Error(CategoryNotFound());
            }
            var item = await category.findItemByName(itemName);
            if(!item){
                throw new Error(ItemNotFound());
            }
            await category.RemoveItem(item);

            return "Deleted";
        }
        catch(e){
            throw e;
        }
    };
};

module.exports = new DbAccess;
