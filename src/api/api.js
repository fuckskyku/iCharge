import fly from './apiConfig'
import { Z_FULL_FLUSH } from 'zlib';


//登录
export const login = param => {
    return fly.post('/api/login', param);
}

//判断手机号手否存在
export const isStatus = param => {
    return fly.post('/api/isStatus', param);
}

//获取cookie
export const getSessionId = param => {
    return fly.get('/api/getSessionId', param)
}

//激活帐号
export const sendNoTokenSms = param => {
    return fly.postCode('/api/sms/sendNoTokenSms', param);
}

//获取图形验证码
export const captcha = param => {
    return fly.getCode('/api/captcha', param)
}

//激活
export const userActive = param => {
    return fly.post("/api/user/userActive", param);
}

//修改密码
export const modifyPasswordOnLogin = param => {
    return fly.postHeader('api/user/modifyPasswordOnLogin', param)
}
//找回密码
export const forgetPwd = param => {
    return fly.post('api/user/forgetPwd', param)
}



//修改手机号码
export const modifyMobile = param => {
    return fly.postHeader('api/user/modifyMobile', param)
}

//（内页）获取手机验证码
export const sendSms = param => {
    return fly.postHeader('api/sms/sendSms', param)
}

//我的子女列表
export const students = param => {
    return fly.postHeader('api/userCenter/students', param)
}


//获取机构列表
export const schoolList = param => {
    return fly.postHeader('api/userCenter/schoolList', param)
}

//切换机构
export const switchSchool = param => {
    return fly.postHeader('api/userCenter/switchSchool', param);
}


//通知阅读状态更改
export const info = param => {
    return fly.postHeader('api/schoolNews/info', param)
}

//学生日历考勤
export const monthRfidClock = param => {
    return fly.postHeader('api/rfidMachine/monthRfidClock', param)
}

//(通过原密码修改密码))
export const modifyPassword = param => {
    return fly.postHeader('api/user/modifyPassword', param)
}

//切换学生
export const studentsParent = param => {
    return fly.postHeader("/api/userCenter/studentsParent", param)
}

//修改学生个人信息
export const updateStudent = param => {
    return fly.postHeader("/api/student/updateStudent", param)
}


//首页
export const index = (param) => {
    return fly.postHeader('/api/index/content', param);
}

//通知列表
export const noticsList = (param) => {
    return fly.postHeader('/api/schoolNews/noticPage', param);
}

//用户基础信息
export const userCenter = param => {
    return fly.postHeader('/api/userCenter/userCenter', param);
}

//获取新闻/通知详情
export const getSchoolNews = param => {
    return fly.postHeader('/api/schoolNews/info', param);
}

//获取作业详情
export const getHomework = param => {
    return fly.postHeader('/api/homework/info', param);
}

//新闻评论列表
export const getComment = param => {
    return fly.getHeader('/api/comment/page', param);
}

//提交新闻评论
export const postComment = param => {
    return fly.postHeader('/api/comment/save', param);
}

//点赞
export const markGood = param => {
    return fly.postHeader('/api/markgood/save', param);
}

//取消点赞
export const cancelMarkGood = param => {
    return fly.postHeader('/api/markgood/cancelMarkGood', param);
}



/**
 * 
 * 教师端接口抛出
 * 
 */

//教师任课科目
export const subjects = param => {
    return fly.postHeader('api/userCenter/subjects', param)
}

//获取我的信息
export const myRlease = param => {
    return fly.postHeader('api/userCenter/myRlease', param);
}

//修改个人信息
export const modifyUserInfo = param => {
    return fly.postHeader('api/user/modifyUserInfo', param)
}

//获取教师班级
export const classTeacher = param => {
    return fly.postHeader('api/homework/classTeacher', param)
}

//获取数据字典
export const commonDictList = param => {
    return fly.postHeader('api/commonDict/list', param)
}

//发布作业
export const homeworkSave = param => {
    return fly.postHeader('api/homework/save', param)
}

//发布新闻
export const newSave = param => {
    return fly.postHeader('api/schoolNews/save', param)
}

//发布通知

export const noticeSave = param => {
    return fly.postHeader('api/schoolNews/saveNotice', param)
}

//删除作业
export const deleteHomework = param => {
    return fly.postHeader('api/userPublish/deleteHomework', param);
}

//删除新闻通知 
export const deleteSchoolNews = param => {
    return fly.postHeader('api/userPublish/deleteSchoolNews', param)
}


//设置审批人
export const departmentUsersTree = param => {
    return fly.postHeader('api/department/departmentUsersTree', param)
}

//后台默认审批配置
export const getApprovalCopy = param => {
    return fly.postHeader('api/approval/getApprovalCopy', param)
}

//班级数据结构
export const classGradeTree = param => {
    return fly.postHeader('api/grade/classGradeTree', param)
}

//我的发布 
export const publishList = param => {
    return fly.postHeader('api/userPublish/publishList', param)
}

//新闻风采草稿列表 
export const draftSchoolNewsList = param => {
    return fly.postHeader('api/userPublish/draftSchoolNewsList', param)
}

//作业草稿列表 
export const draftHomeworkList = param => {
    return fly.postHeader('api/userPublish/draftHomeworkList', param)
}

//通知草稿列表 
export const draftSchoolNoticeList = param => {
    return fly.postHeader('api/userPublish/draftSchoolNoticeList', param)
}

//审批列表 
export const approvalList = param => {
    return fly.postHeader('api/approval/list', param)
}

//抄送我的列表 
export const approvalCopyList = param => {
    return fly.postHeader('api/approval/copyList', param)
}


//审批详情 
export const approvalPage = param => {
    return fly.postHeader('api/approval/approvalPage', param)
}

//审批 
export const auditStatus = param => {
    return fly.postHeader('api/approval/auditStatus', param)
}

