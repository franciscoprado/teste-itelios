function getCategories(){
	var root = {id:'root', parent:null, children:[]};
	var books = {id:'books', parent:root, children:[]};
	var movies = {id:'movies', parent:root, children:[]};
	var fantasy = {id:'fantasy', parent:books, children:[]};
	var tolkien = {id:'tolkien', parent:fantasy, children:[]};

	root.children = [books, movies];
	books.children = [fantasy];
	fantasy.children = [tolkien];
	
	return root;
}


function getProductsAssignements(){
	return{
		B001:['movies', 'fantasy'],
		D8:['tolkien', 'root'],
		RX20:[],
	}
}

/* Complete the function below.
 * productid is a string, function must return an array of paths, or an  array with ‘EMPTY’ if no paths is found for the current product.
 * A path is a semi-colon separated list of category ids, from root to target category, which allows to reach a product.
 */
function getPaths(productID){
	var root = getCategories();
	var assignments = getProductsAssignements();
    
    if (!assignments.hasOwnProperty(productID) || assignments[productID].length == 0) {
        breadcrumbs = ['EMPTY'];
    }
    else {
        var list = assignments[productID];
        var breadcrumbs = [];

        for (var i = 0; i < list.length; i++) {
            var current = list[i];
            var path = [list[i]];

            isChild(root.children, list[i], path);

            path = path.reverse().join(";");
            breadcrumbs.push(path);
        }
    }
    
    // only the longest paths
    for (var j = 0; j < breadcrumbs.length; j++) {
        for (var k = 0; k < breadcrumbs.length; k++) {
            if (j != k) {
                var path1 = breadcrumbs[j];
                var path2 = breadcrumbs[k];

                if (path1.indexOf(path2) >= 0) {
                    breadcrumbs = breadcrumbs.splice(j, 1);
                }

                if (path2.indexOf(path1) >= 0) {
                    breadcrumbs = breadcrumbs.splice(k, 1);
                }
            }
        }
    }
        
	// To be completed
	return breadcrumbs;
}

var addToPath = function(list, path) {
    if (list.parent != null) {
        var id = list.parent.id;
        path.push(id);
        
        return addToPath(list.parent, path);
    }
};

var isChild = function(list, id, path) {
    for (var i = 0; i < list.length; i++) {
        if (id != list[i].id) {
            isChild(list[i].children, id, path);
        }
        else {
            return addToPath(list[i], path);
        }
    }
};

console.warn("In order to analyze the test please open the script.js file. There, on the last lines, are the getPaths() function calls. Below, an example:");
console.log(getPaths('B001'));
//console.log(getPaths('D8'));
//console.log(getPaths('RX20'));
//console.log(getPaths('XXXXXXXX'));
//console.log(getPaths(' '));