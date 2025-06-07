import Form from "@components/product/Form"
import { STATUS_ACTIVE } from "@form/product";

const CreateScreen = () =>{
    const product = {
    id:0,
    name: "",
    status:STATUS_ACTIVE,
    image: '',
    price: 0,
    categoryId: 0,
  };
 return (
    <Form product={product}/>
 )
}
export default CreateScreen