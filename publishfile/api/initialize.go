package api

import (
	"github.com/gin-gonic/gin"
)

func Register(g *gin.RouterGroup) {
	publishFileGroup := g.Group("/")
	//publishFileGroup.Use(middleWrapper(checkParams)).Use(middleWrapper(checkContentRequest))
	// 添加
	publishFileGroup.Group("/file-api").POST("/addFile",addFile)
	publishFileGroup.Group("/file-api").GET("/getFile",getFile)
	publishFileGroup.Group("/file-api").DELETE("/getFile/:fileId",delFile)
	publishFileGroup.Group("/file-api").PUT("/getFile/:fileId",putFile)
}