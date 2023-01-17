import Mustache from "mustache/mustache.mjs";

const templateStr = `
<ul>
    {{#arr}}
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
    {{/arr}}
</ul>
`;

const data = {
    arr: [
        { name: "小明", age: 12, hobbies: ["游泳"] },
        { name: "小红", age: 13, hobbies: ["编程", "写作文", "看报纸"] },
        { name: "小强", age: 14, hobbies: ["打台球"] },
    ],
};

const res = Mustache.render(templateStr, data);
console.log(res);
const con = document.getElementById('app')
con.innerHTML = res;
