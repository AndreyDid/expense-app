export function mathIncome(arr, data) {
    return arr.map((a) =>
        a._id === data.account
            ? { ...a, sum: Number(a.sum) + Number(data.sum) }
            : a
    );
}

export function mathExpense(arr, data) {
    return arr.map((a) =>
        a._id === data.account
            ? { ...a, sum: Number(a.sum) - Number(data.sum) }
            : a
    );
}

export function mathDeleteExpense(arr, data) {
    return arr.map((a) =>
        a._id === data.map((d) => d.account).join()
            ? {
                  ...a,
                  sum: Number(a.sum) + Number(data.map((s) => s.sum))
              }
            : a
    );
}

export function mathDeleteIncome(arr, data) {
    return arr.map((a) =>
        a._id === data.map((d) => d.account).join()
            ? {
                  ...a,
                  sum: Number(a.sum) - Number(data.map((s) => s.sum))
              }
            : a
    );
}

export function mathUpdateExpense(arr, arrAcc, data) {
    return arrAcc.map((a) =>
        a._id === data.account
            ? { ...a, sum: Number(a.sum) + arr.sum - data.sum }
            : a
    );
}

export function mathUpdateIncome(arr, arrAcc, data) {
    const increment = Number(arr.sum) - Number(data.sum);
    return arrAcc.map((a) => ({
        ...a,
        sum: Number(a.sum) - Number(increment)
    }));
}
