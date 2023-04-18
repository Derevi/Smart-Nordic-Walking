import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { StatusCard } from '@/components/sidebar/status-card'

const inter = Inter({ subsets: ['latin'] })

function handleSubmit(e) {
  e.preventDefault();
  const postData = async () => {
    const data = {
      title: title,
      post: post,
    };

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.json();
  };
  postData().then((data) => {
    alert(data.message);
  });
}

export default function Home(props) {
  const { window, children,Component, pageProps, currentUser, } = props;
  useEffect(()=>{
    document.cookie = JSON.stringify(currentUser)
  })
  
  return (
    <>
      <Head>
        <title>Nordic Walking</title>
        <meta name="description" content="Nordic Walking" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <form onSubmit={handleSubmit} >
        <label for="username">username:</label>
        <input type="text" id="username" name="username" />
        <label for="password">password:</label>
        <input type="text" id="password" name="password" />
        <button type="submit">Submit</button>
      </form> */}



{/* <Divider textAlign="left">Heart Rate</Divider>
      <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
      <StatusCard/>
      </Grid>
      <Grid item xs={6} md={4}>
      <StatusCard/>
      </Grid>
    </Grid>

    <Divider textAlign="left"><h2>Force</h2></Divider>

    <Grid container spacing={2}>
    <Grid item xs={6} md={4}>
      <StatusCard/>
      </Grid>
      <Grid item xs={6} md={8}>
      <StatusCard/>
      </Grid>
    </Grid> */}
    <StatusCard/>



    </>
  )
}
