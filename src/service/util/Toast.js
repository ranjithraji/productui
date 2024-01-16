import { toast } from "react-toastify";

export const Toast = (props) => toast(props.message,{
    type: props.type,
    position: toast.POSITION[props.position],
    theme: props.theme
}); 