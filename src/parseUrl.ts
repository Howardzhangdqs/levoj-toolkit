const parseUrl = () => {
    const url = window.location.href.split("/");

    let index = 0;

    for (let i = 0; i < url.length; i++) {
        if (url[i].length > 50) {
            index = i + 1;
            break;
        }
    }

    const link = url.slice(index);
    const baselink = url.slice(0, index);

    const newLink = baselink.join("/") + `/v1/problem/logic?prefix=${link[link.length - 2]}&logicId=${link[link.length - 1]}`;

    return newLink;
};

export default parseUrl;