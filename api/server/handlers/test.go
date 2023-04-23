package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ExecuteTest() gin.HandlerFunc {
	fn := func(g *gin.Context) {

		g.JSON(http.StatusOK, gin.H{"result": "Ok"})
	}

	return gin.HandlerFunc(fn)
}
