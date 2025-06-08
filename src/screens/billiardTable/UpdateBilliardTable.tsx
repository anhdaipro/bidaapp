"use client"
import Form from "@/app/conponent/billiardTable/Form";
import { useBilliardTable } from "@/app/query/useBilliardTable";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useRoute } from "@react-navigation/native";
const UpdateBilliardTable:React.FC = () => {
    const router = useRoute<any>()
    const id = router.params?.id
    const {data: table, isLoading} = useBilliardTable(Number(id));
    if(isLoading) return (
       <LoadingSpinner/>
    );
    return (<Form table={table}/>)
   
  };
  
  export default UpdateBilliardTable;