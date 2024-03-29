import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>
               <meta name='description' content='Snap photos of fully customizable 3d models!' />
               <meta name="keywords" content="3D, Three.js, Illustration, 3D Viewer, Web Design, UI Design, UX, UI, UX Design" />
               <meta name="author" content="Paul Richan" />
               <link rel='icon' href='/favicon.ico' />

               <link rel='preconnect' href='https://fonts.googleapis.com' />
               <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
               <link href='https://fonts.googleapis.com/css2?family=Gugi&display=swap' rel='stylesheet' />
               <link
                  href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
                  rel='stylesheet'
               />
            </Head>
            <body className='font-montserrat'>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument
