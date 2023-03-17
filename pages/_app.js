
import SideBar from '@/components/sidebar/side-bar';



export default function  App({ Component, pageProps, currentUser }){
  //Component: the component we are trying to load from one of the pages. It is the actual page we want to show the user
  //pageProps: the set of components that we intended to pass to the (1st arg) "Component"

  return (<div>
      {/* <Header  currentUser={currentUser} /> */}

      <SideBar currentUser={currentUser} {...pageProps}>
        <Component currentUser={currentUser} {...pageProps}/>
      </SideBar>
      {/* <ContentBox >
          <Component currentUser={currentUser} {...pageProps}/>
      </ContentBox> */}
  </div>);
}

// Page.getLayout = (page) => (
//   <SideBar>
//     {page}
//   </SideBar>
// );

App.getInitialProps = async appContext =>{
  // Load user data here....
  const data = {
    currentUser:{
        login: "testUser", 
        pass:"testPass"
    }
  }
  let pageProps={};
     //loads 'getInitialProps' of (child) page only if it exists
  if(appContext.Component.getInitialProps){
      pageProps = await appContext.Component.getInitialProps(appContext.ctx,data.currentUser)
    
  }
  return {
      pageProps,
      ...data //current user data
  };
 
 }