package config

import (
	"database/sql"
	"errors"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/urfave/cli/v2"
	"gitlab.gg.com/game_framework/commons-go/wlog"
)

var (
	Mode string

	HttpPort int //监控的http端口

	EnvHttpPort string

	sqlDb *sql.DB           //数据库连接db

	// 日志使用elk时kafka的地址
	LogKafkaBrokers cli.StringSlice

	LogLevel    string
	LogFilePath string

	LogTopic string

	Host string

	// 服务名
	ServiceName string

	// 是否为生产服务器 (true, false)
	Product bool

)

func SettingInit() error {
	wlog.Infof("ENV_HTTP: %s", EnvHttpPort)
	httpPorts := strings.Split(EnvHttpPort, ":")
	if len(httpPorts) != 2 {
		return errors.New("HTTP_PORT 设置无法折解成 2 个元素")
	}

	if httpPorts[0] != httpPorts[1] {
		return errors.New("HTTP_PORT 端口不一致")
	}

	var err error
	HttpPort, err = strconv.Atoi(httpPorts[0])
	if err != nil {
		return err
	}

	wlog.Infof("HTTP_PORT: %d", HttpPort)
	return nil
}
