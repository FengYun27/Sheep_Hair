
/*
[mitm]
hostname = *.amemv.com

[rewrite local]
luckycat/aweme/v1/task/walk/step_submit? url script-request-header https://raw.githubusercontent.com/FengYun27/Sheep_Hair/main/dyjsb.js
*/
const $ = new Env('抖音极速版')
const notify = $.isNode() ? require('./sendNotify') : '';

const TASK_WAIT_TIME = 1 //每个任务等待的秒数 
const aid = '2329'
let AllMessage = ''
let envSplitor = ['#']

let fengyun_dyjsb_cookie = ($.isNode() ? process.env.fengyun_dyjsb_signcookie : $.getdata('fengyun_dyjsb_cookie')) || '';
let fengyun_dyjsb_keys = ($.isNode() ? process.env.fengyun_dyjsb_keys : $.getdata('fengyun_dyjsb_keys')) || '';
let dyhost = 'api5-normal-c-lq.amemv.com';

let userList = []
let userIndex = 1
let userCount = 0

const cookieArr = [];

class UserAction {
    constructor(userCookie) {
        this.cookie = userCookie
        this.isLogin = true //是否登录
        this.sign_in_completed = false //签到任务的状态
        this.jiao_take_cash_completed = false //每日提现0.3的状态
        this.daily_read_20s_completed = false //每日观看180分钟的状态
        this.excitation_ad_completed = false //观看广告的状态
    }

    async httpRequest(method, options) {
        this.httpResult = null, this.httpReq = null, this.httpResp = null;
        return new Promise((resolve) => {
            $.send(method, options, async (err, req, resp) => {
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

    //开始任务
    async Task() {
        AllMessage += `\n============ 账号[${userIndex}] ============`
        $.log(`\n============ 账号[${userIndex}] ============`)
        await task_page()
        AllMessage += `---------- 签到 ----------`
        console.log(`---------- 签到 ----------`)
        await sign_in();
        if (!this.isLogin) {
            AllMessage += `---------- 看视频 ----------`
            $.log(`---------- 看视频 ----------`)
            for (let count = 0; count < 545; count++) {
                await watch_video(count);
                $.wait(1000 * 21)
            }
        } else {
            AllMessage += `---------- 步数 ----------`
            $.log(`---------- 步数 ----------`)
            await step_submit()
            await step_reward()
            AllMessage += `---------- 宝箱广告 ----------`
            $.log(`---------- 宝箱广告 ----------`)
            await treasure_task()
            await excitation_ad_treasure_box()
            await excitation_ad()
            AllMessage += `---------- 看视频 ----------`
            $.log(`---------- 看视频 ----------`)
            for (let count = 0; count < 545; count++) {
                await watch_video(count);
                $.wait(1000 * 21)
            }
        }
        userIndex++;
    }

    //获取任务列表
    async task_page() {
        let options = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/page?${fengyun_dyjsb_keys}`,
            headers: {
                Cookie: this.cookie,
                'User-Agent': 'AwemeLite 14.9.0 rv:149005 (iPhone; iOS 14.5; zh_CN) Cronet'
            }
        }
        await httpRequest('get', options)

        let result = this.httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            this.isLogin = result.data.is_login
            AllMessage += `🎉获取任务列表成功 当前用户${result.data.is_login == true ? '在线' : '未登录'} 共有任务${result.data.task_list.length}个`
            $.log(`🎉获取任务列表成功 当前用户${result.data.is_login == true ? '在线' : '未登录'} 共有任务${result.data.task_list.length}个`)
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
            //$.log(`🎉开启宝箱成功 获得音符:${result.data.amount} 看广告再赚${result.data.excitation_ad_info.score_amount}音符`)
        } else {
            $.log(`❗️${result.err_tips}`)
        }
    }

    //签到
    async sign_in() {
        if (sign_in_completed) {
            AllMessage += `⚠️当日签到任务已经完成`
            $.log(`⚠️当日签到任务已经完成`)
        }
        let options = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/sign_in?aid=${aid}`,
            headers: {
                Cookie: this.cookie,
                'User-Agent': 'AwemeLite 14.9.0 rv:149005 (iPhone; iOS 14.5; zh_CN) Cronet'
            }
        }
        await httpRequest('post', options)

        let result = this.httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 10006) {
            AllMessage += `🎉${result.err_tips}`
            $.log(`🎉${result.err_tips}`)
        } else if (result.err_no == 10001) {
            AllMessage += `⚠️该账号ck已过期(只能获取看视频的收益)`
            $.log(`⚠️该账号ck已过期(只能获取看视频的收益)`)
            this.isLogin = false
        }
        else {
            AllMessage += `❗️${result.err_tips}`
            $.log(`❗️${result.err_tips}`)
        }
    }

    //提交步数
    async step_submit() {
        const steps = Math.round(Math.random() * (12000 - 10001) + 10001);
        const time = Math.round(new Date().getTime() / 1000).toString();
        let options = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/walk/step_submit?$aid=${aid}`,
            headers: {
                Cookie: this.cookie,
                'User-Agent': 'AwemeLite 14.9.0 rv:149005 (iPhone; iOS 14.5; zh_CN) Cronet'
            },
            body: `
            {
                "step" : ${steps},
                "submit_time" :${time},
                "in_sp_time" : 0
            }`
        }
        await httpRequest('post', options)

        let result = this.httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉提交 步数:${steps} 成功`
            $.log(`🎉提交 步数:${steps} 成功`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            $.log(`❗️${result.err_tips}`)
        }
    }

    //领取走路金币
    async step_reward() {
        let options = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/walk/receive_step_reward?${fengyun_dyjsb_keys}`,
            headers: {
                Cookie: this.cookie,
                'User-Agent': 'AwemeLite 14.9.0 rv:149005 (iPhone; iOS 14.5; zh_CN) Cronet'
            },
            body: `{"in_sp_time":0}`
        }
        await httpRequest('post', options)

        let result = this.httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += result.err_tips + "获得:" + result.data.reward_amount + '\n'
            $.log(`🎉` + result.err_tips + "获得:" + result.data.reward_amount)
        } else {
            AllMessage += `❗️${result.err_tips}(可能是奖励领取过了)`
            $.log(`❗️${result.err_tips}(可能是奖励领取过了)`)
        }
    }

    //开启宝箱
    async treasure_task(count) {
        let options = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/treasure_task?$aid=${aid}`,
            headers: {
                Cookie: this.cookie,
                'User-Agent': 'AwemeLite 14.9.0 rv:149005 (iPhone; iOS 14.5; zh_CN) Cronet'
            },
            body: `{"in_sp_time" : 0}`
        }
        await httpRequest('post', options)

        let result = this.httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉开启宝箱成功 获得音符:${result.data.amount} 看广告再赚${result.data.excitation_ad_info.score_amount}音符`
            $.log(`🎉开启宝箱成功 获得音符:${result.data.amount} 看广告再赚${result.data.excitation_ad_info.score_amount}音符`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            $.log(`❗️${result.err_tips}`)
        }
    }

    //开启宝箱看广告
    async excitation_ad_treasure_box(count) {
        let options = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/excitation_ad_treasure_box?${fengyun_dyjsb_keys}`,
            headers: JSON.parse(fengyun_dyjsb_cookie)
        }
        await httpRequest('post', options)

        let result = this.httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉开启宝箱看广告成功 获得音符:${result.data.amount}`
            $.log(`🎉开启宝箱看广告成功 获得音符:${result.data.amount}`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            $.log(`❗️${result.err_tips}`)
        }
    }

    //看视频
    async watch_video(count) {
        if (daily_read_20s_completed) {
            AllMessage += `⚠️看视频任务已经完成`
            $.log(`⚠️看视频任务已经完成`)
        }
        let options = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/read?$aid=${aid}`,
            headers: {
                Cookie: this.cookie,
                'User-Agent': 'AwemeLite 14.9.0 rv:149005 (iPhone; iOS 14.5; zh_CN) Cronet'
            },
            body: `
            {
                "in_sp_time" : 0,
                "task_key" : "read"
            }`
        }
        await httpRequest('post', options)

        let result = this.httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉观看第${count}次视频成功 获得音符:${result.data.score_amount}`
            $.log(`🎉观看第${count}次视频成功 获得音符:${result.data.score_amount}`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            $.log(`❗️${result.err_tips}`)
        }
    }

    //看广告
    async excitation_ad(count) {
        if (excitation_ad_completed) {
            AllMessage += `⚠️看广告任务已经完成`
            $.log(`⚠️看广告任务已经完成`)
        }
        let options = {
            url: `https://${dyhost}/luckycat/aweme/v1/task/done/excitation_ad?${fengyun_dyjsb_keys}`,
            headers: JSON.parse(fengyun_dyjsb_cookie)
        }
        await httpRequest('post', options)

        let result = this.httpResult;
        if (!result) return
        //console.log(result)

        if (result.err_no == 0) {
            AllMessage += `🎉看广告成功 获得音符奖励:${result.data.amount}`
            $.log(`🎉看广告成功 获得音符奖励:${result.data.amount}`)
        } else {
            AllMessage += `❗️${result.err_tips}`
            $.log(`❗️${result.err_tips}`)
        }
    }
}


!(async () => {
    if (typeof $request !== "undefined") {
        await CheckEnv()
        await GetRewrite()
    } else {
        if (!(await CheckEnv())) return;

        $.log(`============ 共${userCount}个账号 ============`)

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

// =====================================重写======================================= \\
async function GetRewrite() {
    if ($request && $request.url.indexOf("aweme" && "step_submit") >= 0) {
        const urlkeys = $request.url.split(`?`)[1]
        //let headers = $request.headers
        //headers = headers.time.X-Khronos = ''
        const cookie = JSON.stringify($request.headers)

        if (cookie) {
            let data = $.getdata('fengyun_dyjsb_cookie')
            //cookieArr 不存在该值就添加
            if (cookieArr.indexOf(cookie) == -1) {
                if (data) {
                    let newcookie = data + '#' + cookie
                    $.setdata(newcookie, `fengyun_dyjsb_cookie`)
                } else {
                    $.setdata(cookie, `fengyun_dyjsb_cookie`)
                }
                $.log(`[${$.name}] 获取第${cookieArr.length + 1}个cookie请求成功\n${cookie}\n`)
                $.msg(`[${$.name}] 获取第${cookieArr.length + 1}个cookie成功🎉`, ``)
            }
        }
        if (urlkeys) {
            let data = $.getdata('fengyun_dyjsb_keys')
            if (!data) {
                $.setdata(urlkeys, `fengyun_dyjsb_keys`)
                $.log(`[${$.name}] 获取keys请求成功\n${urlkeys}\n`)
                $.msg(`[${$.name}] 获取keys成功`, ``)
            }
        }
    }
}
// ====================================环境变量===================================== \\
async function CheckEnv() {
    let success = true;
    //console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
    //console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
    //$.log(`该脚本的所有环境变量只能用 # 隔开`)

    if (fengyun_dyjsb_cookie) {
        let splitor = envSplitor[0];
        for (let sp of envSplitor) {
            if (fengyun_dyjsb_cookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }
        for (let cookie of fengyun_dyjsb_cookie.split(splitor)) {
            if (cookie) {
                cookieArr.push(cookie)
            }
        }
        $.log(`${$.name} 共找到cookie ${cookieArr.length}个`)
        success = true;
    } else {
        console.log(`${$.name} 未找到 fengyun_dyjsb_cookie`)
        success = false;
    }

    if (!fengyun_dyjsb_keys) {
        console.log(`${$.name} 未找到 fengyun_dyjsb_keys`)
        success = false;
    } else {
        cookieArr.forEach((item) => {
            userList.push(new UserAction(item))
        })
        userCount = cookieArr.length
    }

    return success;
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } isShadowrocket() { return "undefined" != typeof $rocket } isStash() { return "undefined" != typeof $environment && $environment["stash-version"] } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { if (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: i, statusCode: r, headers: o, rawBody: h } = t; e(null, { status: i, statusCode: r, headers: o, rawBody: h }, s.decode(h, this.encoding)) }, t => { const { message: i, response: r } = t; e(i, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { let i = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...o } = t; this.got[s](r, o).then(t => { const { statusCode: s, statusCode: r, headers: o, rawBody: h } = t; e(null, { status: s, statusCode: r, headers: o, rawBody: h }, i.decode(h, this.encoding)) }, t => { const { message: s, response: r } = t; e(s, r, r && i.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, i = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": i } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }