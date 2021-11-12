package config

import (
	"database/sql"
	"fmt"
	"gitlab.gg.com/game_framework/commons-go/wlog"
	"log"
)

var (

)

func Initialize() error {
	initLog()
	initDB()
	return SettingInit()
}

func initDB() {
	//1、打开数据库
	//parseTime:时间格式转换(查询结果为时间时，是否自动解析为时间);
	// loc=Local：MySQL的时区设置
	sqlStr := "root:123456@tcp(127.0.0.1:3306)/testdb?charset=utf8&parseTime=true&loc=Local"
	var err error
	sqlDb, err = sql.Open("mysql", sqlStr)
	if err != nil {
		fmt.Println("数据库打开出现了问题：", err)
		return
	}
	//2、 测试与数据库建立的连接（校验连接是否正确）
	err = sqlDb.Ping()
	if err != nil {
		fmt.Println("数据库连接出现了问题：", err)
		return
	}
}

// 初始化日志
func initLog() {
	lv, err := wlog.ParseLevel(LogLevel)
	if err != nil {
		// log.Fatal为sdk自带的log包，此时出错，wlog还未初始化，不能使用
		log.Fatal(err)
	}

	//var opts []wlog.OptFunc

	opts := []wlog.OptFunc{
		wlog.WithFixField("host", Host),
		wlog.WithFile("./logs/"+ServiceName, wlog.Linux|wlog.Windows, wlog.Day, 30),
	}

	//// 如果日志打印的文件路径不为空，则说明希望日志打印到文件
	//if LogFilePath != "" {
	//	log.Printf("日志初始化, 进行日志文件路径选项添加 %v", LogFilePath)
	//
	//	opts = append(opts, wlog.WithFile(LogFilePath, wlog.Linux, wlog.Day, 100))
	//}

	// 如果日志打印kafka地址不为空，则说明希望打印到ELK
	if len(LogKafkaBrokers.Value()) > 0 {
		wlog.Infof("LOG_KAFKA=%v", LogKafkaBrokers)
		if len(LogKafkaBrokers.Value()) == 1 {
			if LogKafkaBrokers.Value()[0] != "" {
				log.Printf("日志初始化，进行kafka选项添加 %v", LogKafkaBrokers.Value())
				opts = append(opts, wlog.WithELK(LogKafkaBrokers.Value(), ServiceName, LogTopic))
			}
		} else {
			log.Printf("日志初始化，进行kafka选项添加 %v", LogKafkaBrokers.Value())
			opts = append(opts, wlog.WithELK(LogKafkaBrokers.Value(), ServiceName, LogTopic))
		}
	}

	wlog.Initialize(lv, opts...)
}
