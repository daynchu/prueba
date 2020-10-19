const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const server_name = "test";
const PORT = process.env.PORT || 3001;
var cache = require('memory-cache');
const { rejects } = require("assert");

var app = express();
const server = require("http").Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(`/${server_name}`, express.static(path.resolve("public")));
server.listen(PORT, function() {
    console.log(`servidor ${server_name} corriendo en puerto ${PORT}`);
  });
  



  app.post(`/${server_name}/restaurante`, async (req,res,next) =>
  {
    let restaurante= req.body
      try{
        let Oldres= cache.get('res')
        if (Oldres == null)
        {
            var NueRestaurante = {
                'Nombre': restaurante.name,
                'kindOfRestaurant': restaurante.kindOfRestaurant,
                'songs': restaurante.songs
            };
            cache.put('res', NueRestaurante);
            return res.statusCode(201)
        }else{
            if(Oldres.Nombre == restaurante.name)
            {
                return res.statusCode(400)
            }
            else
            {
                var NueRestaurante = {
                    'Nombre': restaurante.name,
                    'kindOfRestaurant': restaurante.kindOfRestaurant,
                    'songs': restaurante.songs
                };
                cache.put('res', NueRestaurante);
                return res.statusCode(201)
            }
        }
        
      }catch(e)
      {
          next(e)
      }
  })

  app.get(`/${server_name}/restaurante`, async (req,res,next) =>
  {
      try{
        console.log(cache.get('res'))
      }catch(e)
      {
          next(e)
      }
  })

  app.get(`/${server_name}/restaurante/:tipo`, async (req,res,next) =>
  { 
      let tporest = req.params
      try{
        let restaurante= cache.get('res')
        if(tporest == restaurante.kindOfRestaurant)
        {
            res.send(restaurante)
        }
      }catch(e)
      {
          next(e)
      }
  })
