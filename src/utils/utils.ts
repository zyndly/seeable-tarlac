
interface entityType {
    [key:string]:string
}
const entityMap: entityType = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
export const escapeHtml = (str: string): string => {
    return String(str).replace(
        /[&<>"'`=\/]/g, 
        (s: string) => {
                return entityMap[s];
            }
    );
}

export const sanitizeString = (str: string): string => {

    return escapeHtml(str);
}

export const truncate = (input:string, limit:number):string => {

    return input.length > limit ? `${input.substring(0, limit)}...` : input; 
}
