// import './source-code.js'
import parseTemplateToTokens from "./parseTemplateToTokens.js";
import renderTemplate from "./renderTemplate.js";

// const templateStr = "我买了一个{{thing}}，好{{mood}}啊";
const templateStr = `
<ul>
    {{#students}}
        <li>
            <div class="hd">{{name}}的基本信息</div>
            <div class="bd">
                <p>{{name}}的爱好是：</p>
                <ol>
                    {{#hobbies}}
                        <li>{{.}}</li>
                    {{/hobbies}}
                </ol>
            </div>
        </li>
    {{/students}}
</ul>
`;

const data = {
    students: [
        { name: "小明", age: 12, hobbies: ["游泳"] },
        { name: "小红", age: 13, hobbies: ["编程", "写作文", "看报纸"] },
        { name: "小强", age: 14, hobbies: ["打台球"] },
    ],
};

// 全局提供SSG_TemplateEngine对象
window.SSG_TemplateEngine = {
    // 渲染方法
    render(templateStr, data) {
        // 调用parseTemplateToTokens函数，让模板字符串变为tokens数组
        const tokens = parseTemplateToTokens(templateStr);
        // 调用renderTemplate函数，让tokens数组变为dom字符串
        document.querySelector('#app').innerHTML = renderTemplate(tokens, data);
    },
};

// 调用渲染
SSG_TemplateEngine.render(templateStr, data);
