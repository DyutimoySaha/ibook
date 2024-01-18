import { Route, Routes } from 'react-router-dom';

import { Toaster } from "@/components/ui/toaster";
import { useState } from 'react';
import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import RootLayout from './_root/RootLayout';
import { AllUser, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import CreatePost from './_root/pages/CreatePost';
import './globals.css';



const App = () => {
  const [dark,setDark]=useState<boolean>(false)
  // const [theme,setTheme]=useState<boolean>(false);
    const handleTheme=()=>{
      // setTheme((prev)=>!prev);
 
      setDark((prev)=>!prev)
      if(!dark){
       
        document.body.classList.remove('dark-mode')
        document.body.classList.add('light-mode')

      }else{
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode')

      }
    }
   
  return (
    <main className={`file h-screen `}>
      <div onClick={handleTheme} className='absolute flex justify-center items-center  top-2 right-4 p-[10px] rounded-full  bg-indigo-500 text-white cursor-pointer'>
       {dark? <img className='h-8 w-8 scale-75' src="/assets/icons/dark-mode.svg" alt="" />
        :<img className='h-8 w-8 ' src="/assets/icons/light-mode.svg" alt=""  />}
      </div>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>


          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* private routes*/}
        <Route element={<RootLayout dark={dark}/>}>
          <Route index element={<Home dark={dark}/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/saved" element={<Saved/>}/>
          <Route path="/all-users" element={<AllUser/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:id" element={<EditPost/>}/>
          <Route path="/post/:id" element={<PostDetails />}/>
          <Route path="/profile/:id/*" element={<Profile/>}/>
          <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
        </Route>
        
      </Routes>
      <Toaster/>
    </main>
  )
}

export default App