package api

import (
	"github.com/gin-gonic/gin"
)

type queryOrderRequest struct {
	OrderId         int64   `json:"orderId,omitempty" binding:"-"`
}

// 添加文件
func addFile(ctx *gin.Context) {
	request := &queryOrderRequest{}
	err := ctx.BindJSON(request)
	if err != nil {
		return
	}
	ctx.JSON(200, gin.H{
		"message":"success",
	})
	return
}

func getFile(ctx *gin.Context) {
	request := &queryOrderRequest{}
	err := ctx.BindJSON(request)
	if err != nil {
		return
	}
	ctx.JSON(200, gin.H{
		"message":"success",
	})
	return
}

func delFile(ctx *gin.Context) {
	request := &queryOrderRequest{}
	err := ctx.BindJSON(request)
	if err != nil {
		return
	}
	ctx.JSON(200, gin.H{
		"message":"success",
	})
	return
}