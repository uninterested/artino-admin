String.prototype.format = function (...rest: Primitive[]): string {
    let retStr = this
    for (const i in rest)
        retStr = retStr.replace(new RegExp(`\\[${i}\\]`, 'gi'), (rest[i] ?? '').toString())
    return retStr as string
}
