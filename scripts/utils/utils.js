/* eslint-disable no-unused-vars */
export default function StringtoNode(viewStringified){
    const viewAsANode = new DOMParser().parseFromString(viewStringified, "text/html").querySelector("body").firstChild
    return viewAsANode
}