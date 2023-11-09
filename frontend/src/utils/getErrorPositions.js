export default function getErrorPositions(errorList) {
    let newList = []
    // errorList.map((r) => newList.push({from: Number(r.start), to: Number(r.end), message: String(r.fin)}))
    errorList.map((r) => newList.push({from: Number(r.start), to: Number(r.end), eng: String(r.eng), fin: String(r.fin)}))
    return newList
}