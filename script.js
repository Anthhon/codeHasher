// Define custom base characters (alphanumeric characters + special characters)
const baseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function encodeToBase64(text) {
	const binaryData = unescape(encodeURIComponent(text))
		.split('')
		.map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
		.join('');

	let encoded = '';
	for (let i = 0; i < binaryData.length; i += 6) {
		const chunk = binaryData.slice(i, i + 6).padEnd(6, '0');
		encoded += baseChars[parseInt(chunk, 2)];
	}

	return encoded;
}

function decodeFromBase64(encoded) {
	const binaryData = encoded
		.split('')
		.map(char => baseChars.indexOf(char).toString(2).padStart(6, '0'))
		.join('');

	let decoded = '';
	for (let i = 0; i < binaryData.length; i += 8) {
		decoded += String.fromCharCode(parseInt(binaryData.slice(i, i + 8), 2));
	}

	return decodeURIComponent(escape(decoded));
}

function extractCodeFromURL() {
	const url = window.location.href;
	const prefix = "/paste/";
	const startIndex = url.indexOf(prefix);
	if (startIndex !== -1) {
		return url.slice(startIndex + prefix.length);
	}
	return null; // Return null if no code is found in the URL
}

function generateLink() {
	let inputCode = document.getElementById("code-field").value;
	const encodedCode = encodeToBase64(inputCode);

	var linkElement = document.getElementById("generated-link");
	linkElement.textContent = `${window.location.href}paste/${encodedCode}`;
	linkElement.hidden = false;
}

window.onload = function() {
	const extractedCode = extractCodeFromURL();
	if (extractedCode) {
		// Exihibit extracted code
		let inputCodeLabel = document.getElementById("label-code-field");
		let codeField = document.getElementById("code-field");
		let button = document.getElementById("button");

		codeField.value = decodeFromBase64(extractedCode);
		inputCodeLabel.remove()
		button.remove()
	}
};

