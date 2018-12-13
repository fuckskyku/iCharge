import fly from './apiConfigRetailer'

//获取机构首页
export const getBannerAdGood = param => {
    return fly.post('/api/ParentAdLog/getBannerAdGood', param);
}





