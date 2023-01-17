import Scanner from "./scanner.js";
import nestTokens from "./nestTokens.js";

export default function parseTemplateToTokens(templateStr) {
    let tokens = [];
    // 实例化一个扫描器，用于扫描模板字符串
    const scanner = new Scanner(templateStr);
    let words;
    // 遍历寻找开始标记{{与结束标记}}
    while (!scanner.eos()) {
        words = scanner.scanUtil("{{");
        // 收集开始标记出现之前的文字
        if (words !== "") {
            tokens.push(["text", words]);
        }
        scanner.scan("{{");
        words = scanner.scanUtil("}}");
        /**
         *  判断从 {{ 和 }} 之间收集到的 word 的开头是不是特殊字符 # 或 /,
         *  如果是则这个 token 的第一个元素相应的为 # 或 /, 否则为 name
         */
        if (words !== "") {
            if (words[0] === "#") {
                tokens.push(["#", words.substring(1)]);
            } else if (words[0] === "/") {
                tokens.push(["/", words.substring(1)]);
            } else {
                tokens.push(["name", words]);
            }
        }
        scanner.scan("}}");
    }
    return nestTokens(tokens);
};
