/**
 * 折叠tokens，将#和/之间的tokens整合起来，作为它下标为3的项
 */
export default function nestTokens(tokens) {
    const nestedTokens = [];
    // 栈结构，存放内部tokens，栈顶（嵌套最里面的）tokens数组中当前操作的tokens小数组
    const sections = [];
    // 收集器，天生指向nestedTokens结果数组，引用类型值，所以指向同一个数组
    // 收集器的指向会变化，当遇见#的时候，收集器指向token下标为2的新数组
    let collector = nestedTokens;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        switch (token[0]) {
            case "#":
                // 收集器放入token
                collector.push(token);
                // 入栈
                sections.push(token);
                // 收集器切换，给token添加下标为2的项并且让收集器指向它
                collector = token[2] = [];
                break;
            case "/":
                // 出栈
                sections.pop();
                // 改变收集器为栈结构队尾（栈顶）那项的下标为2的数组，如果栈顶不存在即长度为0，指回原结果数组
                collector = sections.length ? sections[sections.length - 1][2] : nestedTokens;
                break;
            default:
                collector.push(token);
        }
    }
    return nestedTokens;
};
