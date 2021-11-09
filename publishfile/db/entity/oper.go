package entity

import (
	"gitlab.gg.com/framework/common/db"
	"time"
)

func GetAllWhiteIPs() ([]*WhiteIp, error){
	i := make([]*WhiteIp,0)
	err := db.DataSource().Find(&i)
	if err != nil {
		return nil, err
	}else {
		return i, nil
	}
}

// 获取白名单ip
func GetWhiteIP(ip string) (*WhiteIp, error) {
	i := &WhiteIp{
		Ip: ip,
	}

	ok, err := db.DataSource().Get(i)
	if err != nil {
		return nil, err
	}
	if ok {
		return i, nil
	}
	return nil, nil
}

// 添加项目
func InsertProject(project *Project) (int64, error) {
	_, err := db.DataSource().Insert(project)
	return project.Id,err
}
