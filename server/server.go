package server

import (
	"log"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/prashantkhandelwal/cannon/config"
	apihandlers "github.com/prashantkhandelwal/cannon/server/handlers"
)

func Run(c *config.Config) {
	port := c.Port

	if c.Environment != "" {
		if strings.ToLower(c.Environment) == "release" {
			log.Printf("Using environment: %v\n", c.Environment)
			gin.SetMode(gin.ReleaseMode)
		} else {
			gin.SetMode(gin.DebugMode)
		}
	} else {
		gin.SetMode(gin.DebugMode)
	}

	router := gin.Default()

	router.GET("/ping", apihandlers.Ping)

	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{
			"code": "PAGE_NOT_FOUND", "message": "Page not found",
		})
	})

	err := router.Run(":" + port)
	if err != nil {
		log.Fatalf("Error starting the server! - %v", err)
	}

	log.Println("Server running!")
}
