import {Routes, Route} from 'react-router-dom';

import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { AllUser, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile} from './_root/pages'
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import CreatePost from './_root/pages/CreatePost';
import { useEffect, useState } from 'react';



const App = () => {
  const [dark,setDark]=useState<boolean>(false)
  // const [theme,setTheme]=useState<boolean>(false);
    const handleTheme=()=>{
      // setTheme((prev)=>!prev);
    const isDark=localStorage.getItem('isDark')??null;

      localStorage.setItem("isDark",isDark==="true"?"false":"true");
      setDark(isDark==="true"?true:false)
      if(isDark&&isDark==="true"){
       
        document.body.classList.remove('dark-mode')
        document.body.classList.add('light-mode')

      }else{
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode')

      }
    }

    const isDark=localStorage.getItem('isDark')??null;
    useEffect(()=>{
      if(!isDark){
        localStorage.setItem("isDark","false");
      }
      if(isDark&&Boolean(isDark)){
        document.body.classList.remove('dark-mode')

      }else{
        document.body.classList.add('dark-mode')

      }

    },[isDark])
  return (
    <main className={`file h-screen `}>
      <button onClick={handleTheme} className='absolute top-2 right-4 p-2 rounded-xl bg-indigo-500 text-white'>Dark Mode</button>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>


          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        {/* private routes*/}
        <Route element={<RootLayout dark={dark}/>}>
          <Route index element={<Home />}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/saved" element={<Saved/>}/>
          <Route path="/all-users" element={<AllUser/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/update-post/:id" element={<EditPost/>}/>
          <Route path="/post/:id" element={<PostDetails/>}/>
          <Route path="/profile/:id/*" element={<Profile/>}/>
          <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
        </Route>
        
      </Routes>
      <Toaster/>
    </main>
  )
}

export default App