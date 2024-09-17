import parseUrl from "./parseUrl";

(async () => {
    const target_url = parseUrl();

    const respond: string = (await (await fetch(target_url)).json()).content;

    console.log(respond);

    // 悬浮按钮
    const button = document.createElement("button");
    
    button.style.position = "fixed";
    button.style.bottom = "10px";
    button.style.left = "10px";
    button.style.zIndex = "9999";
    button.innerText = "复制 Markdown";
    button.className = "btn btn-primary btn-sm";

    addEventListener("click", () => {
        navigator.clipboard.writeText(respond);
    });

    document.body.appendChild(button);
})();