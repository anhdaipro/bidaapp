import LoadingSpinner from "@components/common/LoadingSpinner"
import Form from "@components/product/Form"
import { useProduct } from "@hook/query/useProducts"
import { useRoute } from "@react-navigation/native"

const UpdateScreen = () =>{
    const router = useRoute<any>()
    const id = router.params?.id
    console.log(router)
    const {data:product, isLoading} = useProduct(id)
    if(isLoading){
        return  <LoadingSpinner/>
    }
    return (
        <Form product={product}/>
    )
}
export default UpdateScreen