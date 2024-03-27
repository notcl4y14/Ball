let utils_clamp = function (num, min, max) {
	if (num < min) return min;
	if (num > max) return max;

	return num;
}

let utils_dot = function (num) {
	return num / ( num != 0 ? Math.abs(num) : 1 );
}

let utils_loadImage = function (src) {
	let img = new Image();
	img.src = src;
	return img;
}

let utils_fillBGText = function (ctx, text, x, y, bgColor) {
	let textWidth = 5;
	let textHeight = 8;

	let rectW = text.length * textWidth;
	let rectH = textHeight;

	ctx.fillStyle = bgColor;
	ctx.fillRect(x, y, rectW, rectH);

	let textY = y + textHeight;

	ctx.fillStyle = "#ffffff";
	ctx.fillText(text, x, textY);
}