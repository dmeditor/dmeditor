import { DeleteOutline } from "@mui/icons-material"
import { PropertyButton } from "../../utils/Property"
import { useEditorStore } from "Src/core/main/store"

export const DeleteBlock = ()=>{
    const {selected:{currentListPath, blockIndex}, removeByPath} = useEditorStore();

    const handleDelete = ()=>{
      removeByPath([...currentListPath, blockIndex]);
    }

    return <PropertyButton onClick={handleDelete} variant="outlined" color="warning" title="Delete">
    <DeleteOutline /> Delete
  </PropertyButton>   
}