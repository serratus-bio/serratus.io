export const filterObject = (data: any[], keys: string[]): any[] => {
    var newObjArr: any[] = []
    data.forEach((e) => {
        let newObj: any = new Object()
        keys.forEach((k) => {
            newObj[k] = e[k]
        })
        newObjArr.push(newObj)
    })
    return newObjArr
}
