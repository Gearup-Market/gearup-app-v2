const copyText = (text: string) => {
	if (navigator.clipboard && navigator.permissions) {
		navigator.clipboard.writeText(text);
	} else if (document.queryCommandSupported("copy")) {
		const ele = document.createElement("textarea");
		ele.value = text;
		document.body.appendChild(ele);
		ele.select();
		const done = document.execCommand("copy");
		document.body.removeChild(ele);
	}
};

export default copyText;
