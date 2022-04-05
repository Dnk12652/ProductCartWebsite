package routes

import (
	"ecommerce/AllRoutes"

	"github.com/gin-gonic/gin"
)

func UserRoutes(RequestRoutes *gin.Engine) {
	RequestRoutes.POST("/api/users/register", AllRoutes.UserSignUp())
	RequestRoutes.POST("/api/users/login", AllRoutes.UserLogin())
	RequestRoutes.POST("api/seller/addproduct", AllRoutes.ProductViewerSeller())
	RequestRoutes.GET("api/users/productview", AllRoutes.GettingProducts())
}
