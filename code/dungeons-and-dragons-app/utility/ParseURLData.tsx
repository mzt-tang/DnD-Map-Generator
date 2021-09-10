/**
 * Gets an object / array of objects from URL get parameter
 *
 * @param url
 */
const parseURLParams = (url: string) => {
    const list : string[] = url.split("/");
    return list[2];
}

export default parseURLParams
