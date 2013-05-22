var pinyin_chars = ["ā", "á", "ǎ", "à","ē", "é", "ě", "è","ī", "í", "ǐ", "ì","ō", "ó", "ǒ", "ò","ū", "ú", "ǔ", "ù", "ǖ", "ǘ", "ǚ", "ǜ"];
var replacementChars = ["a1", "a2", "a3", "a4","e1", "e2", "e3", "e4","i1", "i2", "i3", "i4","o1", "o2", "o3", "o4","u1", "u2", "u3", "u4", "ü1", "ü2", "ü3", "ü4"];

var replaceSoundSigns = function(string){
	var stringReplaced = string;
	for(var i = 0; i < pinyin_chars.length; i++) {
		stringReplaced = stringReplaced.replace(pinyin_chars[i], replacementChars[i]);
	}
	return stringReplaced;
}