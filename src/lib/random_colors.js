export const get_random_color = function () {
    let color = "#";
    for (let i = 0; i < 3; i++)
        color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
    return color;
}

export const hl_get_random_colors = function (length) {
    const def_colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#6610f2", "#d63384", "#fd7e14", "#198754", "#20c997", "#0dcaf0", "#6c757d"];

    if (def_colors.length > length) {
        return def_colors.slice(0, length);
    }

    length = length - def_colors.length;
    let colors = def_colors;
    while (length--) {
        colors.push(get_random_color());
    }
    return colors;
};
