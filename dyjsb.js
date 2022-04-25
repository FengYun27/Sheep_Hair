/*
[mitm]
hostname = *.amemv.com

[rewrite local]
luckycat/aweme/v1/task/done/read? url script-request-header https://raw.githubusercontent.com/FengYun27/Sheep_Hair/main/dyjsb.js
luckycat/aweme/v1/task/walk/step_submit? url script-request-header https://raw.githubusercontent.com/FengYun27/Sheep_Hair/main/dyjsb.js
*/
const $ = new Env('抖音极速版')
const notify = $.isNode() ? require('./sendNotify') : '';
console.log($.isNode())
const TASK_WAIT_TIME = 1 //每个任务等待的秒数 
let AllMessage = ''
let envSplitor = ['#']
let httpResult, httpReq, httpResp;

let fengyun_dyjsb_stepcookie = ($.isNode() ? process.env.fengyun_dyjsb_stepcookie : $.getdata('fengyun_dyjsb_stepcookie')) || '';
let fengyun_dyjsb_readcookie = ($.isNode() ? process.env.fengyun_dyjsb_readcookie : $.getdata('fengyun_dyjsb_readcookie')) || '';
let fengyun_dyjsb_keys = ($.isNode() ? process.env.fengyun_dyjsb_keys : $.getdata('fengyun_dyjsb_keys')) || '';
let dyhost = 'api5-normal-c-lq.amemv.com';

let userList = []
let userIndex = 1
let userCount = 0

const readcookieArr = [], stepcookieArr = [];

class UserAction {
    constructor(step, read) {
        this.aid = '2329'
        this.step = JSON.parse(step)
        this.cookie = JSON.parse(read)
        this.isLogin = true //是否登录
        this.sign_in_completed = false //签到任务的状态
        this.jiao_take_cash_completed = false //每日提现0.3的状态
        this.daily_read_20s_completed = false //每日观看180分钟的状态
        this.excitation_ad_completed = false //观看广告的状态
    }

    genderHeader() {
        if(this.step['X-Khronos']){
            this.step['X-Khronos'] = Math.round(new Date().getTime() / 1000).toString();
            this.step['tt-request-time'] = Math.round(new Date()).toString();
        }

        if(this.cookie['X-Khronos']){
            this.cookie['X-Khronos'] = Math.round(new Date().getTime() / 1000).toString();
            this.cookie['tt-request-time'] = Math.round(new Date()).toString();
        }
    }

    //开始任务
    async Task() {
        try {
            AllMessage += `\n============ 账号[${userIndex}] ============`
            console.log(`\n============ 账号[${userIndex}] ============`)
            await this.task_page()
            if (!this.isLogin) {
                AllMessage += `---------- 看视频 ----------`
                console.log(`---------- 看视频 ----------`)
                for (let count = 0; count < 545; count++) {
                    await this.watch_video(count);
                    await $.wait(1000 * 21)
                }
            } else {
                AllMessage += `---------- 签到 ----------`
                console.log(`---------- 签到 ----------`)
                await this.sign_in();
                AllMessage += `---------- 步数 ----------`
                console.log(`---------- 步数 ----------`)
                await this.step_submit()
                await this.step_reward()
                AllMessage += `---------- 宝箱广告 ----------`
                console.log(`---------- 宝箱广告 ----------`)
                await this.treasure_task()
                await $.wait(TASK_WAIT_TIME * 1000)
                await this.excitation_ad()
                await this.excitation_ad_treasure_box()
                AllMessage += `---------- 看视频 ----------`
                console.log(`---------- 看视频 ----------`)
                for (let count = 0; count < 545; count++) {
                    await this.watch_video(count);
                    await $.wait(1000 * 21)
                }
            }
            userIndex++;
        } catch (e) {
            console.log(e)
        }
    }

    //获取任务列表
    async task_page() {
        this.genderHeader()
        let url = `https://${dyhost}/luckycat/aweme/v1/task/page?${fengyun_dyjsb_keys}`
        let headers = this.cookie
        let urlObject = populateUrlObject(url, headers)
        await httpRequest('get', urlObject)
        let result = httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            this.isLogin = result.data.is_login
            AllMessage += `🎉获取任务列表成功 当前用户${result.data.is_login == true ? '在线' : '未登录'} 共有任务${result.data.task_list.length}个`
            console.log(`🎉获取任务列表成功 当前用户${result.data.is_login == true ? '在线' : '未登录'} 共有任务${result.data.task_list.length}个`)
            result.data.task_list.forEach(item => {
                switch (item.key) {
                    case 'sign_in':
                        this.sign_in_completed = item.completed
                        break;
                    case 'jiao_take_cash':
                        this.jiao_take_cash_completed = item.completed
                        break;
                    case 'daily_read_20s':
                        this.daily_read_20s_completed = item.completed
                        break;
                    case 'excitation_ad':
                        this.daily_read_20s_completed = item.completed
                        break;
                    default:
                        break;
                }
            });
            //AllMessage +=
            //console.log(`🎉开启宝箱成功 获得音符:${result.data.amount} 看广告再赚${result.data.excitation_ad_info.score_amount}音符`)
        } else {
            console.log(`❗️${result.err_tips}`)
        }
    }

    //签到
    async sign_in() {
        if (this.sign_in_completed) {
            AllMessage += `⚠️当日签到任务已经完成`
            console.log(`⚠️当日签到任务已经完成`)
            return
        }
        this.genderHeader()
        let url = `https://${dyhost}/luckycat/aweme/v1/task/done/sign_in?aid=${this.aid}`
        let headers = this.cookie
        let urlObject = populateUrlObject(url, headers)
        await httpRequest('post', urlObject)
        let result = httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 10006) {
            AllMessage += `🎉${result.err_tips}`
            console.log(`🎉${result.err_tips}`)
        } else if (result.err_no == 10001) {
            AllMessage += `⚠️该账号ck已过期(只能获取看视频的收益)`
            console.log(`⚠️该账号ck已过期(只能获取看视频的收益)`)
            this.isLogin = false
        }
        else {
            AllMessage += `❗️${result.err_tips}`
            console.log(`❗️${result.err_tips}`)
        }
    }

    //提交步数
    async step_submit() {
        this.genderHeader()
        const time = Math.round(new Date().getTime() / 1000).toString();
        let url = `https://${dyhost}/luckycat/aweme/v1/task/walk/step_submit?aid=${this.aid}`
        let headers = {
            Cookie: this.step.Cookie,
            'User-Agent': 'AwemeLite 14.9.0 rv:149005 (iPhone; iOS 14.5; zh_CN) Cronet'
        }
        let body = `
        {
            "step" : 18889,
            "submit_time" :${time},
            "in_sp_time" : 0
        }`
        let urlObject = populateUrlObject(url, headers, body)
        await httpRequest('post', urlObject)
        let result = httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉提交 步数:18889 成功`
            console.log(`🎉提交 步数:18889 成功`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            console.log(`❗️${result.err_tips}`)
        }
    }

    //领取走路金币
    async step_reward() {
        this.genderHeader()
        let url = `https://${dyhost}/luckycat/aweme/v1/task/walk/receive_step_reward?aid=${this.aid}`
        let headers = this.step
        let body = `{"in_sp_time":0}`
        let urlObject = populateUrlObject(url, headers, body)
        await httpRequest('post', urlObject)
        let result = httpResult;
        if (!result) return

        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += result.err_tips + "获得音符:" + result.data.reward_amount + '\n'
            console.log(`🎉` + result.err_tips + "获得音符:" + result.data.reward_amount)
        } else {
            AllMessage += `❗️${result.err_tips}(可能是奖励领取过了)`
            console.log(`❗️${result.err_tips}(可能是奖励领取过了)`)
        }
    }

    //开启宝箱
    async treasure_task(count) {
        this.genderHeader()
        let url = `https://${dyhost}/luckycat/aweme/v1/task/done/treasure_task?aid=${this.aid}`
        let headers = this.cookie
        let body = `{"in_sp_time" : 0}`
        let urlObject = populateUrlObject(url, headers, body)
        await httpRequest('post', urlObject)
        let result = httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉开启宝箱成功 获得音符:${result.data.amount} 看广告再赚${result.data.excitation_ad_info.score_amount}音符`
            console.log(`🎉开启宝箱成功 获得音符:${result.data.amount} 看广告再赚${result.data.excitation_ad_info.score_amount}音符`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            console.log(`❗️${result.err_tips}`)
        }
    }

    //开启宝箱看广告
    async excitation_ad_treasure_box() {
        this.genderHeader()
        let url = `https://${dyhost}/luckycat/aweme/v1/task/done/excitation_ad_treasure_box?${fengyun_dyjsb_keys}`
        let headers = this.cookie
        let urlObject = populateUrlObject(url, headers)
        await httpRequest('post', urlObject)
        let result = httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉开启宝箱看广告成功 获得音符:${result.data.amount}`
            console.log(`🎉开启宝箱看广告成功 获得音符:${result.data.amount}`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            console.log(`❗️${result.err_tips}`)
        }
    }

    //看视频
    async watch_video(count) {
        if (this.daily_read_20s_completed) {
            AllMessage += `⚠️看视频任务已经完成`
            console.log(`⚠️看视频任务已经完成`)
            return
        }
        this.genderHeader()
        let url = `https://${dyhost}/luckycat/aweme/v1/task/done/read?${fengyun_dyjsb_keys}`
        let headers = this.cookie
        let body = `{
            "in_sp_time": 0,
            "task_key": "read"
        }`
        let urlObject = populateUrlObject(url, headers, body)
        await httpRequest('post', urlObject)
        console.log(httpReq)
        console.log(httpResult)
        console.log(httpResp)
        let result = httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉观看第${count}次视频成功 获得音符:${result.data.score_amount}`
            console.log(`🎉观看第${count}次视频成功 获得音符:${result.data.score_amount}`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            console.log(`❗️${result.err_tips}`)
        }
    }

    //看广告
    async excitation_ad(count) {
        if (this.excitation_ad_completed) {
            AllMessage += `⚠️看广告任务已经完成`
            console.log(`⚠️看广告任务已经完成`)
            return
        }
        this.genderHeader()
        let url = `https://${dyhost}/luckycat/aweme/v1/task/done/excitation_ad?${fengyun_dyjsb_keys}`
        let headers = this.cookie
        let urlObject = populateUrlObject(url, headers)
        await httpRequest('post', urlObject)
        let result = httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉看广告成功 获得音符奖励:${result.data.amount}`
            console.log(`🎉看广告成功 获得音符奖励:${result.data.amount}`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            console.log(`❗️${result.err_tips}`)
        }
    }
}

!(async () => {
    if (typeof $request !== "undefined") {
        await CheckEnv()
        await GetRewrite()
    } else {
        if (!(await CheckEnv())) return;

        console.log(`============ 共${userCount}个账号 ============`)

        for (let user of userList) {
            await user.Task();
        }

        if ($.isNode()) {
            await notify.sendNotify(`${$.name}`, AllMessage);
        }
    }
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())

// ===================================== 重写 ======================================= \\
async function GetRewrite() {
    if ($request && $request.url.indexOf("aweme" && "read") >= 0) {
        const readKyes = $request.url.split(`?`)[1]
        const cookie = JSON.stringify($request.headers)

        if (cookie) {
            let data = $.getdata('fengyun_dyjsb_readcookie')
            //cookieArr 不存在该值就添加
            if (readcookieArr.indexOf(cookie) == -1) {
                if (data) {
                    let newcookie = data + '#' + cookie
                    $.setdata(newcookie, `fengyun_dyjsb_readcookie`)
                } else {
                    $.setdata(cookie, `fengyun_dyjsb_readcookie`)
                }
                console.log(`[${$.name}] 获取第${readcookieArr.length + 1}个readcookie请求成功\n${cookie}\n`)
                $.msg(`[${$.name}] 获取第${readcookieArr.length + 1}个readcookie成功🎉`, ``)
            }
        }
        if (readKyes) {
            let data = $.getdata('fengyun_dyjsb_readkey')
            if (!data) {
                $.setdata(readKyes, `fengyun_dyjsb_readkey`)
                console.log(`[${$.name}] 获取readkey请求成功\n${readKyes}\n`)
                $.msg(`[${$.name}] 获取readkeys成功`, ``)
            }
        }
    }
    if ($request && $request.url.indexOf("aweme" && "step_submit") >= 0) {
        const cookie = JSON.stringify($request.headers)
        if (cookie) {
            let data = $.getdata('fengyun_dyjsb_stepcookie')
            //cookieArr 不存在该值就添加
            if (stepcookieArr.indexOf(cookie) == -1) {
                if (data) {
                    let newcookie = data + '#' + cookie
                    $.setdata(newcookie, `fengyun_dyjsb_stepcookie`)
                } else {
                    $.setdata(cookie, `fengyun_dyjsb_stepcookie`)
                }
                console.log(`[${$.name}] 获取第${stepcookieArr.length + 1}个stepcookie请求成功\n${cookie}\n`)
                $.msg(`[${$.name}] 获取第${stepcookieArr.length + 1}个stepcookie成功🎉`, ``)
            }
        }
    }
}
// ==================================== 环境变量 ===================================== \\
async function CheckEnv() {
    let success = true;
    //console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    //console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
    //console.log(`该脚本的所有环境变量只能用 # 隔开`)

    if (fengyun_dyjsb_stepcookie) {
        let splitor = envSplitor[0];
        for (let sp of envSplitor) {
            if (fengyun_dyjsb_stepcookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }
        for (let cookie of fengyun_dyjsb_stepcookie.split(splitor)) {
            if (cookie) {
                stepcookieArr.push(cookie)
            }
        }
        //console.log(`${$.name} 共找到cookie ${cookieArr.length}个`)
        success = true;
    } else {
        console.log(`${$.name} 未找到 fengyun_dyjsb_stepcookie`)
        success = false;
    }

    if (fengyun_dyjsb_readcookie) {
        let splitor = envSplitor[0];
        for (let sp of envSplitor) {
            if (fengyun_dyjsb_readcookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }
        for (let cookie of fengyun_dyjsb_readcookie.split(splitor)) {
            if (cookie) {
                readcookieArr.push(cookie)
            }
        }
        //console.log(`${$.name} 共找到cookie ${cookieArr.length}个`)
        success = true;
    } else {
        console.log(`${$.name} 未找到 fengyun_dyjsb_readcookie`)
        success = false;
    }

    if (!fengyun_dyjsb_keys) {
        console.log(`${$.name} 未找到 fengyun_dyjsb_keys`)
        success = false;
    } else {
        for (let index = 0; index < stepcookieArr.length; index++) {
            userList.push(new UserAction(stepcookieArr[index], readcookieArr[index]))
        }

        userCount = readcookieArr.length
    }

    return success;
}
// ==================================== 请求 ===================================== \\
function populateUrlObject(url, headers, body = '') {
    let host = url.replace('//', '/').split('/')[1]
    headers.host = host
    let urlObject = {
        url: url,
        headers: headers,
        timeout: 5000,
    }
    if (body) {
        urlObject.body = body
        urlObject.headers['Content-Type'] = 'application/json;charset=utf-8'
        urlObject.headers['Content-Length'] = urlObject.body ? urlObject.body.length : 0
    }
    return urlObject;
}

async function httpRequest(method, url) {
    httpResult = null, httpReq = null, httpResp = null;
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            try {
                httpReq = req;
                httpResp = resp;
                if (err) {
                    console.log(`${method}请求失败`);
                    console.log(JSON.stringify(err));
                } else {
                    if (resp.body) {
                        if (typeof resp.body == "object") {
                            httpResult = resp.body;
                        } else {
                            try {
                                httpResult = JSON.parse(resp.body);
                            } catch (e) { }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve();
            }
        });
    });
}

function Env(name, env) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    return new class {
        constructor(name, env) {
            this.name = name
            this.notifyStr = ''
            this.startTime = (new Date).getTime()
            Object.assign(this, env)
            console.log(`${this.name} 开始运行：\n`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i)
                }
            }
            else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        send(m, t, e = (() => { })) {
            if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
                console.log(`无效的http方法：${m}`);
                return;
            }
            if (m == 'get' && t.headers) {
                delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if (t.body && t.headers) {
                if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    t.headers = t.headers || {};
                    Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 });
                }
                let conf = {
                    method: m,
                    url: t.url,
                    headers: t.headers,
                    timeout: t.timeout,
                    data: t.body
                };
                if (m == 'get') delete conf.data
                $axios(conf).then(t => {
                    const {
                        status: i,
                        request: q,
                        headers: r,
                        data: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    });
                }).catch(err => console.log(err))
            } else if (this.isQuanX()) {
                t.method = m.toUpperCase(), this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })),
                    $task.fetch(t).then(t => {
                        const {
                            statusCode: i,
                            request: q,
                            headers: r,
                            body: o
                        } = t;
                        e(null, q, {
                            statusCode: i,
                            headers: r,
                            body: o
                        })
                    }, t => e(t))
            } else if (this.isNode()) {
                this.got = this.got ? this.got : require("got");
                const {
                    url: s,
                    ...i
                } = t;
                this.instance = this.got.extend({
                    followRedirect: false
                });
                this.instance[m](s, i).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "h+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        async showmsg() {
            if (!this.notifyStr) return;
            let notifyBody = this.name + " 运行通知\n\n" + this.notifyStr
            if ($.isNode()) {
                var notify = require('./sendNotify');
                console.log('\n============== 推送 ==============')
                await notify.sendNotify(this.name, notifyBody);
            } else {
                this.msg(notifyBody);
            }
        }
        logAndNotify(str) {
            console.log(str)
            this.notifyStr += str
            this.notifyStr += '\n'
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                        : this.isSurge() ? {
                            url: t
                        }
                            : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "============== 系统通知 =============="];
            h.push(e),
                s && h.push(s),
                i && h.push(i),
                console.log(h.join("\n"))
        }
        getMin(a, b) {
            return ((a < b) ? a : b)
        }
        getMax(a, b) {
            return ((a < b) ? b : a)
        }
        padStr(num, length, padding = '0') {
            let numStr = String(num)
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0
            let retStr = ''
            for (let i = 0; i < numPad; i++) {
                retStr += padding
            }
            retStr += numStr
            return retStr;
        }
        json2str(obj, c, encodeUrl = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encodeUrl) v = encodeURIComponent(v)
                ret.push(keys + '=' + v)
            }
            return ret.join(c);
        }
        str2json(str, decodeUrl = false) {
            let ret = {}
            for (let item of str.split('&')) {
                if (!item) continue;
                let idx = item.indexOf('=')
                if (idx == -1) continue;
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decodeUrl) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret;
        }
        randomString(len, charset = 'abcdef0123456789') {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            return str;
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`)
            if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(t)
        }
    }(name, env)
}