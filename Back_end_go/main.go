package main

import (
	"ecommerce/AllRoutes"
	"ecommerce/database"
	"ecommerce/middleware"
	"ecommerce/routes"
	"log"
	
	cors "github.com/rs/cors/wrapper/gin"
	"github.com/gin-gonic/gin"

)

func main() {
	// This is good and follows the advice of: https://12factor.net/config.
	// But you should do this for all config: mongodb (credentials, database, collections), SECRET_KEY in tokengen.go.
	 port:="5000"

	// This is still a bad way of dependency injection because I would break a
	// lot of your code if I would do it properly. You want to create your
	// database connection in your main.go file and give the database client
	// to the database.ProductData and database.UserData functions.
	app := AllRoutes.NewApplication(database.ProductData(database.Client, "Products"), database.UserData(database.Client, "Users"))

	router := gin.Default()
	router.Use(cors.AllowAll())
	router.Use(gin.Logger())
	routes.UserRoutes(router)

	// The authentication middleware is applied to all routes, including the /users/signup route. So nobody can actually use the application.
	router.Use(middleware.Authentication())

	// Your routes/addtocart are inconsistent starting with and without '/'.
	router.POST("/UserAddtocart", app.AddToCart())
	router.DELETE("/userremoveitem", app.RemoveItem())
	router.GET("/Usercart",AllRoutes.GetItemFromCart())
	router.POST("/addaddress", AllRoutes.AddAddress())
	router.PUT("/edithomeaddress", AllRoutes.EditHomeAddress())

	//router.GET("logout", controllers.Logout())
	//break :)

	// Log the error that the router can possibly return.
	log.Fatal(router.Run(":" + port))

}
