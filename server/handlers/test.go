package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/prashantkhandelwal/cannon/memstore"
)

func ExecuteTest(ms *memstore.MemoryStore) gin.HandlerFunc {
	fn := func(g *gin.Context) {

		//TODO: Implement engine functionality

		err := ms.Add("sdf0", "ADfsdf")
		if err != nil {
			log.Println(err)
		}

		g.JSON(http.StatusOK, gin.H{"result": "Ok"})
	}

	return gin.HandlerFunc(fn)
}

// This function will return the current status of the test.
// TODO: Lookup in memdb and return the status to the user.
// WS
func GetStatus(ms *memstore.MemoryStore) gin.HandlerFunc {
	fn := func(g *gin.Context) {
		id := g.Param("id")

		s, err := ms.Get(id)
		if err != nil {
			log.Printf("ERROR: %s", err.Error())
			g.AbortWithError(http.StatusBadRequest, err)
		}

		g.JSON(http.StatusOK, gin.H{"result": s})
	}

	return gin.HandlerFunc(fn)
}
