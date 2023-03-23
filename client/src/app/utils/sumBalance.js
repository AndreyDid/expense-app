export function sumBalance(arr) {
    return arr.reduce((acc, curr) => {
        return acc + Number(curr);
    }, 0);
}
