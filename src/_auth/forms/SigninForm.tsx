import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react_query/queries";
import { useUserContext } from "@/context/AuthContext";
import { ClockLoader } from "react-spinners";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const SigninForm = () => {
  const {dark}=useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(()=> {
    //logic for getting a value from local storage stored under the key 'key'
    const data = localStorage.getItem('cookieFallback')
    if (data) navigate('/')
  },[])

  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
//Query
//@ts-ignore
  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user);

    if (!session) {
      toast({ title: "Login failed. Please try again." });
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Login failed. Please try again.", });
      
      return;
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img className={`${dark?"invert":""}`} src="/assets/images/ibook.png" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${!dark?"shad-form_label":"text-black"}`}>Email</FormLabel>
                <FormControl>
                  <Input type="text" className={`${!dark?"shad-input":"#fff text-[#000] border-2 border-indigo-600"}`} {...field} />
                </FormControl>
                <FormMessage className="text-red"/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${!dark?"shad-form_label":"text-black"}`}>Password</FormLabel>
                <FormControl>
                  <Input type="password" className={`${!dark?"shad-input":"#fff text-[#000] border-2 border-indigo-600"}`} {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isLoading || isUserLoading ? (
              <div className="flex-center gap-2">
                {/* <Loader />  */}
                <ClockLoader color={"red"} size={30}/>
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className={`text-small-regular ${!dark?"text-light-2":"text-[#000]"} text-center mt-2`}>
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;