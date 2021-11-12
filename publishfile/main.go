package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/urfave/cli/v2"
	"gitlab.gg.com/game_framework/commons-go/wlog"
	"os"
	"publishfile/api"
	"publishfile/config"
)


func main() {
	defer func() {
		e := wlog.PrintPanicStack()
		if e != nil {
			wlog.Error(e)
		}
	}()

	app := &cli.App{
		Name: "publishfile",

		Flags: []cli.Flag{

			// 接入发布服务的预定义的环境变量
			&cli.StringFlag{
				Name:        "HOST_IP",
				Usage:       "本机 ip",
				EnvVars:     []string{"HOST_IP"},
				Value:       "localhost",
				Destination: &config.Host,
			},

			&cli.StringFlag{
				Name:        "SERVICE_NAME",
				Usage:       "服务名",
				EnvVars:     []string{"SERVICE_NAME"},
				Value:       "publishfile",
				Destination: &config.ServiceName,
			},

			&cli.BoolFlag{
				Name:        "IS_PRODUCT",
				Usage:       "是否为生产服务",
				EnvVars:     []string{"IS_PRODUCT"},
				Value:       false,
				Destination: &config.Product,
			},

			&cli.StringFlag{
				Name:        "HttpPort",
				Usage:       "HTTP端口",
				EnvVars:     []string{"HTTP_PORT"},
				Value:       "12833:12833",
				Destination: &config.EnvHttpPort,
			},

			&cli.StringFlag{
				Name:        "mode",
				Aliases:     []string{"m"},
				Usage:       "应用模式(debug|release)",
				EnvVars:     []string{"MODE"},
				Value:       "debug",
				Destination: &config.Mode,
			},

			&cli.StringFlag{
				Name:        "LogLevel",
				Aliases:     []string{"ll"},
				Usage:       "日志等级",
				EnvVars:     []string{"LOG_LEVEL", "LogLevel"},
				Value:       "debug",
				Destination: &config.LogLevel,
			},

			&cli.StringFlag{
				Name:        "LogFilePath",
				Aliases:     []string{"lfp"},
				Usage:       "日志文件所在路径，绝对路径，包括文件名",
				EnvVars:     []string{"LOG_FILE_PATH"},
				Destination: &config.LogFilePath,
			},

			&cli.StringFlag{
				Name:        "LogTopic",
				Aliases:     []string{"lt"},
				Usage:       "日志打印到elk时，需要设置kafka的topic",
				EnvVars:     []string{"LOG_TOPIC"},
				Value:       "game-log",
				Destination: &config.LogTopic,
			},
		},

		Action: action,
	}

	app.Run(os.Args)
}

func startHttpApi() {

	wlog.Info("开启配置服务器.....")

	gin.SetMode(config.Mode)

	engine := gin.Default()
	engine.Use(cors.Default())

	//initAdmin(engine)

	group := engine.Group("/")
	api.Register(group)
	address := fmt.Sprintf(":%d", config.HttpPort)

	wlog.Infof("HTTP Listener On %s", address)
	engine.Run(address)
}


func action(ctx *cli.Context) error {
	err := config.Initialize()
	if err != nil {
		wlog.Errorf("actor err %v", err)
		return err
	}
	startHttpApi()

	return nil
}
