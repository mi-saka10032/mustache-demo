/**
 * 函数的功能是让tokens数组变为DOM字符串
 */
export default function renderTemplate(tokens, data) {
    let domStr = "";
    tokens.forEach(token => {
        switch (token[0]) {
            case "text":
                domStr += token[1];
                break;
            case "name":
                // token[1]指的是data对象中的属性，比如data.students，token[1]就是"students"
                domStr += lookup(data, token[1])
                break
            case '#':
                // 因为是 # + / 遍历的数组，所以解析值取token[2]，data[token[1]]是data中数组的属性值
                domStr += parseArray(token[2], data[token[1]])
        }
    });
    return domStr;
};

// lookup 对象路径解析函数
//取 test.a 的值, 比如说是 temp, 再获取 temp.b 的值, 一步步获取
function lookup(data, key) {
    // 如果传入的 key 里有点符号而且不是仅仅只是点符号
    if (key.indexOf(".") !== -1 && key !== ".") {
        const keys = key.split("."); // 将 key 用 . 分割成一个数组
        return keys.reduce((acc, cur) => {
            return acc[cur]; // 一步步获取
        }, data);
    }
    // 如果传入的 key 没有点符号，直接返回
    return data[key];
}

// parseArray 数组解析函数
// 遇到数组嵌套的情况，需要递归调用renderTemplate将其内部数组递归殆尽
// 由于mustache在模板中默认将 . 点符号作为数组元素本身，因此，递归时需要将 . 代表的item元素传入
function parseArray(tokens, data) {
    let domStr = "";
    data.forEach(item => {
        domStr += renderTemplate(tokens, {
            ...item,
            ".": item,   // 针对简单数组的情况，即模板字符串里的 {{.}}
        });
    });
    return domStr;
}
