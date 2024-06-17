'use client'

import {Button} from "@mui/material";
type Props = {
    onSubmit?:()=>void
}
export default function SpinAction(props:Props){

    const handleSubmit  =() =>{
        props.onSubmit && props.onSubmit()
    }
    return <Button onClick={handleSubmit} size={'large'} variant={'contained'}>
        بچرخون
    </Button>
}