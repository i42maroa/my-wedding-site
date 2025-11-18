export const loadItemFromLocalStorage = <T> (id:string):T | null => {
    const value = localStorage.getItem(id);
    return value?  JSON.parse(value) as T : null;
}

export const saveItemInLocalStorage = <T> (item:T, id:string) =>{
    const data = JSON.stringify(item);
    localStorage.setItem(id, data);
}