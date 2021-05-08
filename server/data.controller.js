const Product = require('./product.model')
const elasticsearch = require('elasticsearch');
// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
   host: 'http://localhost:9200'
});
exports.postData = (req,res)=>{
   
    console.log(req);
    const products = [{name:req.body.name,description:req.body.description}];
    // declare an empty array called bulk
    var bulk = [];
    products.forEach(city =>{
    bulk.push({index:{
                    _index:"store",
                    _type:"productslist",
                }
            })
    bulk.push(city)
    })
    //perform bulk indexing of the data passed
    client.bulk({body:bulk}, function( err, response  ){
            if( err ){
                console.log("Failed Bulk operation".red, err)
            } else {
                console.log("Successfully imported", products.length);
                res.send({msg:"dataAdded"});
            }
    });

}
exports.deleteData = (req,res)=>{
    console.log(req.body.id);
    client.deleteByQuery({
        index: "store",            
        body: {
            query: {
                "match": {
                                "_id":req.body.id
                              }
            }
        }
    }, function (error, response) {
        console.log(response);
        res.send(req.body.id);
    });

}
exports.updateData = (req,res)=>{
    client.update({
        index: "store",
        type: "productslist",
        id: req.body.id,
        body: {
            // put the partial document under the `doc` key
            doc: {
                name:req.body.name
            }
        }
    },function(err,res){
        res.send({msg:"successfully updated"});
    });
}