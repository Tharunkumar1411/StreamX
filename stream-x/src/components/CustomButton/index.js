import { Button } from "@mui/material";

export default function CustomButton(props){
    return(
        <>
            <Button 
                sx={{backgroundColor: "#222", color:"white", opacity: "0.8", fontWeight:"bold", ...props?.extraStyle}} 
                onClick={props?.func}>
                    {props?.name}
            </Button>

        </>
    )
}