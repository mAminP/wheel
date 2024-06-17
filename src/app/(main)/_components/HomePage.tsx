'use client'

import {Button, Grid, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import Well from "@/app/(main)/_components/Well";
import {useState} from "react";
import Box from "@mui/material/Box";
import SpinAction from "@/app/(main)/_components/SpinAction";
import Image from "next/image";

export default function HomePage() {
    const theme = useTheme();
    const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));
    const smAndDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));
    const mdAndDown = useMediaQuery(theme.breakpoints.down('md'));
    const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));
    const lgAndDown = useMediaQuery(theme.breakpoints.down('lg'));
    const xlAndUp = useMediaQuery(theme.breakpoints.up('xl'));
    const xlAndDown = useMediaQuery(theme.breakpoints.down('xl'));
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * 7);
            console.log({newPrizeNumber})
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    }
    const handleSpinStop = () => {
        setTimeout(() => {
            setMustSpin(false)
        }, 800)
    }
    return <Grid container={true} spacing={{xs: 6, sm: 7, md: 10,}} alignItems={{
        lg: 'center'
    }} sx={{minHeight: '100vh', py: 5}}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
            <Stack spacing={{xs: 1, sm: 2, md: 0}} sx={{
                display: 'flex',
                alignItems: {xs: 'center', md: 'start'}
            }} textAlign={{xs: 'center', md: 'left'}}>
                <Typography variant={'h1'}>
                    جشنواره تابستانه
                </Typography>
                <Box sx={{
                    position: 'relative',
                    width: '224px',
                    height: '84px',

                }}>
                    < Image src={'/dentilite_text_logo_2.png'} alt={'dentilite'} fill style={{objectFit: 'contain'}}/>
                </Box>
                <Typography variant={'h2'} sx={{pt: {xs: 2, md: 4, lg: 12}}}>
                    گردونه رو بچرخون و شانست رو امتحان کن !
                </Typography>
                <Typography variant={'h5'} sx={{py: {xs: 1, sm: 3}}}>
                    با چرخوندن گردونه روبه رو، هم میتونی هدیه بگیری وهم از تخفیف های خرید محصولات بهره‌مند بشی
                </Typography>
                {
                    lgAndUp && <SpinAction onSubmit={handleSpinClick}/>
                }

            </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} display={'flex'} alignItems={'start'} justifyContent={'center'}>
            <Stack spacing={{xs: 3, sm: 7, md:11}}>
                <Box
                    display={'flex'} alignItems={'start'} justifyContent={'center'}
                    sx={
                        {
                            transition: 'all 0.2s ease',
                            minHeight: {
                                lg: '500px',
                                md: '350px',
                                sm: '480px',
                                xs: '360px'
                            },
                            // width: '755px',
                            scale: {
                                lg: '1.5',
                                md: '1.3',
                                sm: '1.25',
                                xs: '1.2'
                            }
                        }
                    }>
                    <Well mustSpin={mustSpin} prizeNumber={prizeNumber} onStop={handleSpinStop}/>
                </Box>
                {!lgAndUp && <SpinAction onSubmit={handleSpinClick}/>}
            </Stack>
        </Grid>
    </Grid>
}