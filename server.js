const express = require('express');
const mysql = require('mysql');
const fetch = require('node-fetch');

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

let query = 'SELECT * FROM PRODUCTS where category_id > 2;';
connection.query(query , (err, output) =>{
  if(err){
      throw err;
  }
  console.log("output:" + JSON.stringify(output));
});

async function setMensClothes() {
    let response = await fetch("https://fakestoreapi.com/products/category/men's clothing");
    let data = await response.json();
    let cat_id = 1;

    var i = 1;
    while(data[i] != null){
        let title = data[i]['title'];
        let price = data[i]['price'];
        let desc = data[i]['description'];
        let cat_id = 1;
        let img = data[i]['image'];
        let q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
        connection.query(q , (err, output) =>{
            if(err){
                console.log("error");
                throw err;
            }
            else{
                console.log("inserted!");
            }
        });
        i++;
    }

    response = await fetch('https://dummyjson.com/products/category/mens-shirts/');
    data = await response.json();

    let imgs = ['https://i.pinimg.com/474x/91/4e/a5/914ea5b3590684e2a139248fa9cc1538.jpg', 'https://i.dummyjson.com/data/products/52/1.png', 'http://sc04.alicdn.com/kf/Ue7e5ec91839149e89cede55c3668364fk.jpg', 'https://i.dummyjson.com/data/products/54/4.jpg', 'https://i.dummyjson.com/data/products/55/1.jpg']
    var i = 0;
    while (data['products'][i] != null){
        let title = data['products'][i]['title'];
        let price = data['products'][i]['price'];
        let desc = data['products'][i]['description'];
        let img = imgs[i];
        let q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
        connection.query(q , (err, output) =>{
            if(err){
                console.log("error");
                throw err;
            }
            console.log("inserted!");
        });
        i++;
    }
    connection.end();
}

async function setWomensClothes() {
    let response = await fetch('https://dummyjson.com/products/category/womens-dresses/');
    let data = await response.json();

    let title = data['products'][3]['title'];
    let price = data['products'][3]['price'];
    let desc = data['products'][3]['description'];
    let cat_id = 2;
    let img = data['products'][3]['images'][0];

    let q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
    connection.query(q , (err, output) =>{
        if(err){
            console.log("error");
            throw err;
        }
        else{
            console.log("inserted!");
        }
    });

    response = await fetch('https://dummyjson.com/products/category/tops/');
    data = await response.json();

    title = 'T' + data['products'][1]['title'];
    price = data['products'][1]['price'];
    desc = data['products'][1]['description'];
    img = data['products'][1]['images'][1];

    q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
    connection.query(q , (err, output) =>{
        if(err){
            console.log("error");
            throw err;
        }
        else{
            console.log("inserted!");
        }
    });

    title = data['products'][3]['title'];
    price = data['products'][3]['price'];
    desc = data['products'][3]['description'];
    img = data['products'][3]['images'][1];

    q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
    connection.query(q , (err, output) =>{
        if(err){
            console.log("error");
            throw err;
        }
        else{
            console.log("inserted!");
        }
    });

    title = data['products'][4]['title'];
    price = data['products'][4]['price'];
    desc = data['products'][4]['description'];
    img = data['products'][4]['images'][1];

    q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
    connection.query(q , (err, output) =>{
        if(err){
            console.log("error");
            throw err;
        }
        else{
            console.log("inserted!");
        }
    });

    response = await fetch("https://fakestoreapi.com/products/category/women's clothing");
    data = await response.json();

    var i = 0;
    while (data[i] != null){
        title = data[i]['title'];
        price = data[i]['price'];
        desc = data[i]['description'];
        img = data[i]['image'];
        q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
        connection.query(q , (err, output) =>{
            if(err){
                console.log("error");
                throw err;
            }
            else{
                console.log("inserted!");
            }
        });
        i++;
    }
    
    connection.end();
}

async function setWomensAccessories() {
    let response = await fetch('https://dummyjson.com/products/category/womens-watches/');
    let data = await response.json();
    let cat_id = 4;

    var i = 0;
    while (data['products'][i] != null){
        let title = data['products'][i]['title'];
        let price = data['products'][i]['price'];
        let desc = data['products'][i]['description'];
        
        let img = data['products'][i]['images'][1];
        let q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
        connection.query(q , (err, output) =>{
            if(err){
                console.log("error");
                throw err;
            }
            console.log("inserted!");
        });
        i++;
    }

    response = await fetch('https://dummyjson.com/products/category/womens-shoes/');
    data = await response.json();
    i = 0;
    while (data['products'][i] != null){
        let title = data['products'][i]['title'];
        let price = data['products'][i]['price'];
        let desc = data['products'][i]['description'];
        let img = data['products'][i]['images'][1];
        let q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
        connection.query(q , (err, output) =>{
            if(err){
                console.log("error");
                throw err;
            }
            console.log("inserted!");
        });
        i++;
    }

    response = await fetch('https://dummyjson.com/products/category/womens-bags/');
    data = await response.json();
    i = 0;
    while (data['products'][i] != null){
        let title = data['products'][i]['title'];
        let price = data['products'][i]['price'];
        let desc = data['products'][i]['description'];
        let img = data['products'][i]['images'][0];
        let q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
        connection.query(q , (err, output) =>{
            if(err){
                console.log("error");
                throw err;
            }
            console.log("inserted!");
        });
        i++;
    }
    connection.end();
}

async function setMensAccessories() {
    let response = await fetch('https://dummyjson.com/products/category/mens-watches/');
    let data = await response.json();
    let cat_id = 3;
    var i = 0;
    while (data['products'][i] != null){
        let title = data['products'][i]['title'];
        let price = data['products'][i]['price'];
        let desc = data['products'][i]['description'];
        
        let img = data['products'][i]['images'][1];
        let q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
        connection.query(q , (err, output) =>{
            if(err){
                console.log("error");
                throw err;
            }
            console.log("inserted!");
        });
        i++;
    }

    response = await fetch('https://dummyjson.com/products/category/mens-shoes/');
    data = await response.json();
    i = 0;
    while (data['products'][i] != null){
        let title = data['products'][i]['title'];
        let price = data['products'][i]['price'];
        let desc = data['products'][i]['description'];
        let img = data['products'][i]['images'][1];
        let q = 'INSERT INTO Products(title, price, descp, brand, category_id, pstatus, img_url) VALUES(' + '"' +  title + '",' + price + ',"' + desc + '","XYZ",' + cat_id + ',"In-Stock","' + img + '");';
        connection.query(q , (err, output) =>{
            if(err){
                console.log("error");
                throw err;
            }
            console.log("inserted!");
        });
        i++;
    }


    connection.end();
}

function getProducts(){
    let q = 'SELECT * FROM PRODUCTS'
    connection.query(q , (err, output) =>{
        if(err){
            console.log("error");
            throw err;
        }
        console.log(output);
    });
    connection.end();
}

function getProductCount(){
    let q = 'SELECT COUNT(*) FROM PRODUCTS'
    connection.query(q , (err, output) =>{
        if(err){
            console.log("error");
            throw err;
        }
        console.log(output);
    });
    connection.end();
}

function getProductCategories(){
    let q = 'SELECT * FROM PRODUCTCATEGORIES'
    connection.query(q , (err, output) =>{
        if(err){
            console.log("error");
            throw err;
        }
        console.log(output);
    });
    connection.end();
}

//getProductCategories()
//setMensClothes();
//setWomensClothes();
//setMensAccessories();
//setWomensAccessories();