export default function getErrorPositions(errorList) {
    let newList = []
    errorList.map((r) => newList.push({from: Number(r.start), to: Number(r.end), message: r.message}))
    return newList
}