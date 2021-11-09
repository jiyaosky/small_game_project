package config

import (
	"gitlab.gg.com/game_framework/commons-go/wlog"
	"log"
)

var (

)

func Initialize() error {
	initLog()

	return SettingInit()
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
