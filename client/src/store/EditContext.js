import {createContext, useState} from 'react'
export const EditContext=createContext(null);
function Edit({children}){
    const [editData,setEditData]=useState('')
    return(
        <EditContext.Provider value={{editData,setEditData}} >
            {children}
        </EditContext.Provider>
    )
}
export default Edit;