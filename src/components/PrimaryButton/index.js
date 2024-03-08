/* eslint-disable react/button-has-type */
import { Button } from "@mui/material";

export default function PrimaryButton(props){
    
    return(
        <Button 
        sx={{
            "&:hover": {
                borderBottom: "2px solid white"
            },
            color: "#FF0000"
        }}
    >
        {props.title}
    </Button>
    )
}