/**
 * 扫描器类
 */
export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr
        // position 指针位置
        this.pos = 0;
        // tail 尾巴 初始化时就是模板字符串原文
        this.tail = templateStr;
    }

    // 内容遍历，没有返回值
    scan(tag) {
        if (this.tail.indexOf(tag) === 0) {
            // tag有多长，就让指针后移多少位
            this.pos += tag.length;
            this.tail = this.templateStr.substring(this.pos);
        }
    }

    // 指针遍历内容进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
    scanUtil(stopTag) {
        // 记录执行本方法开始时的pos值
        const pos_backup = this.pos;
        // 尾巴的开头不是stopTag，说明没有扫描到stopTag，pos指针继续右移
        while (!this.eos() && this.tail.indexOf(stopTag) !== 0) {
            // 改变尾巴为从当前指针这个字符开始，到最后的全部字符
            this.tail = this.templateStr.substring(++this.pos)
        }
        return this.templateStr.substring(pos_backup, this.pos);
    }

    // end of string
    eos() {
        return this.pos >= this.templateStr.length;
    }
}
