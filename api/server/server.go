package server

import (
	"log"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/prashantkhandelwal/cannon/config"
	"github.com/prashantkhandelwal/cannon/memstore"
	"github.com/prashantkhandelwal/cannon/server/handlers"
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

	ms := memstore.MemoryStore{}
	db, err := memstore.NewMemoryDB()
	if err != nil {
		log.Printf("ERROR: %s", err.Error())
		return
	}

	ms.DB = db

	router := gin.Default()

	api := router.Group("/api")
	{
		app := api.Group("app")
		app.GET("/ping", handlers.Ping)

		test := api.Group("test")
		test.POST("/run", handlers.ExecuteTest(&ms))
		test.GET("/status/:id", handlers.GetStatus(&ms))
	}

	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{
			"code": "PAGE_NOT_FOUND", "message": "Page not found",
		})
	})

	err = router.Run(":" + port)
	if err != nil {
		log.Fatalf("Error starting the server! - %v", err)
	}

	log.Println("Server running!")
}
