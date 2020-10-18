const code = "堀堝堤堤堧埘培堟堝堦堬埦埘堑堧堭堪埘堬堙堫堣埘堯堧堭堤堜埘堚堝埘堬堧埘堨堪堧堬堝堛堬埘堦堝堯埘堋堝堛堪堝堬埘堂堙堛堣埘堚堤堭堝堨堪堡堦堬堫埘堙堦堜埘堞堡堦堜埘埽堮堙埘堄堭堲堲堡堧堦";
const phrase = "Eva Luzzion";

function encode(code: string, phrase: string) {
    const firstElementCode = code.charCodeAt(0);
    const firstElementCodeShift256 = firstElementCode - 256;
    const codeElementShift = firstElementCodeShift256 <= 0 ? 0 : firstElementCodeShift256;
    const codeArray = code.split("");
    for (let i = codeElementShift; i < codeElementShift + 256; i++) {
        const encoded = codeArray.map(element => {
            const elCharCode = element.charCodeAt(0);
            const shiftedCharCode = elCharCode - i;
            return String.fromCharCode(shiftedCharCode);
        }).join("");
        if (encoded.includes(phrase)) {
            console.log(`Shift ${i}`)
            return encoded;
        }
    }
}

console.log(encode(code, phrase));
