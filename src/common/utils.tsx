/**
 * Filter objects in an array for certain keys.
 *
 * @param oldObjects Array of objects to be filtered.
 * @param keysToInclude The keys to be included.
 * @returns The array of objects filtered to only include certain keys.
 */
export const filterObjects = (oldObjects: any[], keysToInclude: string[]): any[] => {
    let newObjects: any[] = []
    oldObjects.forEach((oldObject) => {
        let newObject: any = new Object()
        keysToInclude.forEach((key) => {
            newObject[key] = oldObject[key]
        })
        newObjects.push(newObject)
    })
    return newObjects
}
