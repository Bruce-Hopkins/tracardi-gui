export default function urlPrefix(url) {
    let _prefix = process.env.PUBLIC_URL

    if(!_prefix) {
        _prefix = "/"
    }

    if(url === "" || !url) {
        return _prefix
    }

    if(_prefix === "/" && url !== "") {
        return url;
    }

    return _prefix + url
}

export function addParamsToUrl(url, params) {
    // Create a URL object
    const urlObj = new URL(url);

    // Iterate through the params object
    for (const [key, value] of Object.entries(params)) {
        // Set each parameter, overwriting if it already exists
        urlObj.searchParams.set(key, value);
    }

    // Return the modified URL as a string
    return urlObj.toString();
}