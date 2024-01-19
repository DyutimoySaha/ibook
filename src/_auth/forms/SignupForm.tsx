import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { useCreateUserAccount, useSignInAccount } from "@/lib/react_query/queries";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { ClockLoader } from "react-spinners";
import { useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
const SignupForm = () => {
  const {dark}=useContext(ThemeContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(()=> {
    //logic for getting a value from local storage stored under the key 'key'
    const data = localStorage.getItem('cookieFallback')
    if (data) navigate('/')
  },[])

  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  //@ts-ignore
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();
  //@ts-ignore
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } = useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });
        
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        
        navigate("/sign-in");
        
        return;
      }

      console.log(newUser)
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        
        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img className={`${dark?"invert":""}`} src="/assets/images/ibook.png" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${!dark?"shad-form_label":"text-black"}`}>Name</FormLabel>
                <FormControl>
                  <Input type="text" className={`${!dark?"shad-input":"#fff text-[#000] border-2 border-indigo-600"}`} {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${!dark?"shad-form_label":"text-black"}`}>Username</FormLabel>
                <FormControl>
                  <Input type="text" className={`${!dark?"shad-input":"#fff text-[#000] border-2 border-indigo-600"}`} {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${!dark?"shad-form_label":"text-black"}`}>Email</FormLabel>
                <FormControl>
                  <Input type="text" className={`${!dark?"shad-input":"#fff text-[#000] border-2 border-indigo-600"}`} {...field} />
                </FormControl>
                <FormMessage className="text-red" />
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
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                {/* <Loader />  */}
                <ClockLoader color={"red"} size={30}/>
              </div>
            ) : (
              "Sign-up"
            )}
          </Button>

          <p className={`text-small-regular ${dark ?"text-[#000]":"text-light-2"} text-center mt-2`}>
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;