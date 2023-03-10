//jshint esversion:6
const mysql = require('mysql');
const fetch = require('node-fetch');

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { json } = require('body-parser');
const { addListener } = require('nodemon');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var session_value = -1;
var session_name = '';
var discountcheck = 0;
    var couponcode = 'happy';
    var message = 'Invalid code';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'SHOP'
});

connection.connect((err) =>{
  if(err) throw err;
  console.log("Connection Successful!");
});



app.get("/",function(req,res)
{console.log("rendering the homepage");
res.render("index2",{session_value  : session_value ,session_name : session_name});
}

);


app.get("/index2" ,function(req,res)
{console.log("rendering the homepage");
res.redirect("/");
}

);


app.get("/accesories" ,function(req,res)
{console.log("rendering the accessories");


let query = 'SELECT * FROM PRODUCTS where category_id > 2;';
connection.query(query , (err, output) =>{
  if(err){
      throw err;
  }
  console.log("output:" + (output[0].title));
 res.render("accesories",{products:output, session_value  : session_value,session_name : session_name});

});
//console.log("output:" + JSON.stringify(output));

}

);

app.get("/login",function(req,res){

  console.log("rendering login");
  res.render("login",{session_value:session_value,session_name : session_name});
});


//postrequest for filters

app.post("/filter_accesories",function(req,res)
{   // console.log("inside filter");
  console.log("filter price: "+req.body.pricef);
 let query = 'SELECT * FROM PRODUCTS where category_id > 2 and price <= '+ req.body.pricef +';';
 connection.query(query , (err, output) =>{
   if(err){
       throw err;
   }
   //console.log("output:" + (output[0].title));
  res.render("accesories",{products:output, session_value  : session_value,session_name : session_name});
 
 });

}
);

app.post("/filter_women",function(req,res)
{   // console.log("inside filter");
  console.log("filter price women: "+req.body.pricef);
 let query = 'SELECT * FROM PRODUCTS where category_id = 2 and price <= '+ req.body.pricef +';';
 connection.query(query , (err, output) =>{
   if(err){
       throw err;
   }
   //console.log("output:" + (output[0].title));
  res.render("women",{products:output, session_value  : session_value ,session_name : session_name});
 
 });

}
);


app.post("/filter_men",function(req,res)
{   // console.log("inside filter");
  console.log("filter price men: "+req.body.pricef);
 let query = 'SELECT * FROM PRODUCTS where category_id = 1 and price <= '+ req.body.pricef +';';
 connection.query(query , (err, output) =>{
   if(err){
       throw err;
   }
   //console.log("output:" + (output[0].title));
  res.render("men",{products:output, session_value  : session_value ,session_name : session_name});
 
 });

}
);



app.post("/logoutuser",function(req,res)
{  console.log("post of logout");
   session_value = -1;
   session_name = '';
 console.log("session value"+ session_value);
 res.redirect("/login");
}
);

app.post("/product/:id",function(req,res)
{

  
let query = 'insert into productreviews (Cid, text,product_idl) values(?,?,?)';

connection.query(query ,[session_value,req.body.postBody,req.params.id], (err, output) =>{
  if(err){
      throw err;
  }
  //let ans = JSON.parse(JSON.stringify(output));
  //console.log("output:" + output[0].price);
     console.log("review added");
});

let query2 = 'insert into cartitems'

let url_c = "/product/"+req.params.id;
res.redirect(url_c);

}
);


app.post("/product/:pid/:price",function(req,res)
{  console.log("in post of p/p/p");
let query = 'insert into cartitems (Pid,cart_id,price,quantity) values(?,?,?,?)';
console.log("product id"+req.params.pid);
console.log("product price"+ req.params.price);
console.log("product quantity"+req.body.count_product);
console.log("cart id"+session_value);

connection.query(query ,[ parseInt(req.params.pid),session_value,parseFloat(req.params.price),parseInt(req.body.count_product)], (err, output) =>{
  if(err){
    console.log(query);
      throw err;
  }  console.log("product added to cartitem");
});

res.redirect("../../cart");
}
);


function entrycustomer( email,name,password){
  let enter = [name,email,password];
  let query = "Insert into customers (name, email, password) values (?)";
  connection.query(query ,[enter], (err, output) =>{
    if(err){
        throw err;
    }
   console.log("inserted success");
  }); 
}


app.post("/register",function(req,res){
console.log("register post method");
console.log(req.body.name);
console.log(req.body.email);
console.log(req.body.password);

let query = "SELECT email from customers where email = '"+req.body.email+"';";
  console.log(query);
  connection.query(query , (err, output) =>{
    if(err){
        throw err;
    }
    if(output.length == 0)
      {console.log(req.body.email+"doesnot exist");
      entrycustomer(req.body.email,req.body.name,req.body.password);
      res.redirect('/login');
    }
    else
     {console.log(req.body.email+" exist");
     res.redirect('/register');
    } 
     
  });

});



app.post("/login",function(req,res){
  console.log("login post method");
  console.log(req.body.email);
  console.log(req.body.password);
  
let query = "SELECT * from customers where email =? and password=?;";
console.log(query);
connection.query(query ,[req.body.email,req.body.password], (err, output) =>{
  if(err){
      throw err;
  }
  if(output.length == 0)
    {console.log("unsuccessful login");
    res.redirect('/login');
  }
  else
   {console.log("successfully login");
   session_value = output[0].id;
   session_name = output[0].name;
   console.log(session_value);
   res.redirect('/');
  } 
   
});
  });
  

  app.post("/cart/:id",function(req,res){
  console.log("in deluser")
  let query = "DELETE from cartitems where id=?;";
  console.log(query);
  connection.query(query ,[req.params.id], (err, output) =>{
    if(err){
        throw err;
    }
   console.log("item removed from cart");
   //  res.render("cart");
  });

  let durl = '/cart'
  res.redirect(durl);
     
  
    
    });


  
    

    app.post("/cart",function(req,res){
      console.log("rendering for coupon");
     if(req.body.coupon==couponcode){
      let query = "update carts set grand_total = grand_total-(0.2*grand_total) where Cid=?";
      console.log(query);
      connection.query(query ,[session_value], (err, output) =>{
        if(err){
            throw err;
        }
       console.log("discount given");
       //  res.render("cart");
      });
      discountcheck = 1;
     }
     else{
      discountcheck=-1;
     }
      let durl = '/cart'
      res.redirect(durl);
         
      
        
        });
      


        app.post("/checkout",function(req,res){
          console.log("rendering for post checkout");
        let query = 'insert into paymentdetails(Cid,nameoncard,card_num,exp_month,address) values (?,?,?,?,?);'
        connection.query(query ,[session_value,req.body.cardname,req.body.cardnumber,req.body.expmonth,req.body.address], (err, output) =>{
          if(err){
              throw err;
          }
         console.log("discount given");
         //  res.render("cart");
         res.redirect("/thanksforshopping");

        });
             
          
            
            });
// Log to console

app.get("/men" ,function(req,res)
{console.log("rendering the men");


let query = 'SELECT * FROM PRODUCTS where category_id = 1;';
connection.query(query , (err, output) =>{
  if(err){
      throw err;
  }
 res.render("men",{products:output ,session_value:session_value ,session_name : session_name});

});


}

);

app.get("/thanksforshopping" ,function(req,res)
{console.log("rendering the thankyoupage");

res.render("thanksforshopping",{session_value:session_value ,session_name : session_name});



}

);





app.get("/cart",function(req,res)
{console.log("rendering the cart");

let query = "select cartitems.id,cartitems.Pid,cartitems.price,cartitems.quantity,cartitems.sub_total,carts.grand_total,products.img_url,products.title from cartitems join carts on cartitems.cart_id = carts.id join products on cartitems.Pid = products.Pid  where carts.id = ?;"

connection.query(query ,[session_value], (err, output) =>{
  if(err){
      throw err;
  }
   

res.render("cart",{cartitem:output,check:discountcheck});

});
}

);


app.get("/checkout",function(req,res)
{console.log("rendering the checkout");
let query = 'select * from cartitems join carts on carts.Cid = cartitems.cart_id where cart_id=?;'
console.log(query);
connection.query(query ,[session_value], (err, output) =>{
  if(err){
      throw err;
  }
  console.log("data fetch");
  res.render("checkout",{itemvalue: output});
});
}

);


app.get("/product/:id",function(req,res)
{
  
let query = 'SELECT * FROM PRODUCTS where pid = '+req.params.id+';';
let query2 = 'select name,text from productreviews,customers where customers.id = cid and product_idl = '+req.params.id+';';
let q2;
//console.log(query);
connection.query(query2 , (err, output) =>{
  if(err){
      throw err;
  }
  //let ans = JSON.parse(JSON.stringify(output));
  //console.log("output:" + output[0].price);
      q2 = output;
});

connection.query(query , (err, output) =>{
  if(err){
      throw err;
  }
  //let ans = JSON.parse(JSON.stringify(output));
  //console.log("output:" + output[0].price);
res.render("product",{item:  output, rev: q2,session_value:session_value ,session_name : session_name});

});


}
);


app.get("/register",function(req,res)
{console.log("rendering the register");
res.render("register");
}

);


app.get("/shipping",function(req,res)
{console.log("rendering the shipping");
res.render("shipping");
}

);


app.get("/women" ,function(req,res)
{console.log("rendering the women");


let query = 'SELECT * FROM PRODUCTS where category_id = 2;';
connection.query(query , (err, output) =>{
  if(err){
      throw err;
  }
 res.render("women",{products:output,session_value:session_value ,session_name : session_name});

});


}

);


app.get("/managerpassword123qwe", function(req, res){
  console.log("In manager get")
  let query = "select * from products";
  connection.query(query ,(err, output) =>{
    if(err){
        throw err;
    }
     res.render("manager",{items:output});
  });
  
});

app.post("/manager/:id",function(req,res){
  
  let query = "update products set stock = stock+? where Pid=?";
  connection.query(query ,[req.body.newstock,req.params.id], (err, output) =>{
    if(err){
        throw err;
    }
   console.log("stockupdated");
     res.redirect("/managerpassword123qwe");
  });
  
    
    });





app.get("/manager-customer", function(req, res){
      console.log("In manager customer")
        let query = "select customers.id,customers.name,customers.email,paymentdetails.address,carts.grand_total from customers join paymentdetails on customers.id = paymentdetails.Cid join carts on carts.Cid = customers.id ; "
      connection.query(query ,(err, output) =>{
        if(err){
            throw err;
        }
         res.render("manager-customer",{items:output});
      });
      
    });



 app.get("/manager-sales", function(req, res){
      console.log("In manager sales")
      let query = "select products.pid,(count(*)) as 'count' from products join cartitems on products.pid = cartitems.Pid group by products.pid; "
      connection.query(query ,(err, output) =>{
        if(err){
            throw err;
        }
         res.render("manager-sales",{items:output});
      });
      
    });





app.get('*', function(req, res){
  //console.log("404 fired");
  res.render("404");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

