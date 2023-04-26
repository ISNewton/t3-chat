import { Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { z } from "zod"
import { toFormikValidationSchema } from "zod-formik-adapter"
import Button from "~/components/buttons/Button"
import Checkbox from "~/components/forms/Checkbox"
import Input from "~/components/forms/Input"
import Label from "~/components/forms/Label"

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState<String>('')

    const { replace } = useRouter()

    const Schema = z.object({
        email: isLogin ? z.optional(z.string().email()) : z.string().email(),
        // email: z.optional(z.string().email()),
        username: z.string().min(5),
        password: z.string().min(8)
    });

    const initialValues = {
        email: '',
        username: '',
        password: '',
    }

    async function handleSignIn(values: {
        email: String,
        password: String,
        username?: String
    }) {
        const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        console.log(result);
        console.log(222);
        

        if (!result?.ok) {
            setError("البريد الالكتروني او كلمة المرور غير صحيحة");

            setTimeout(() => {
                setError('');
            }, 3000)
        } else {

            // toast.success('Welcome back !', {
            //     theme: "colored",
            // })
            replace("/")

        }


    }

    async function handleSignUp(values: {
        email: String,
        password: String,
        username: String
    }) {
        const result = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
        });

        console.log(result,);
        console.log(222);
        

        if (!result?.ok) {
            setError("البريد الالكتروني او كلمة المرور غير صحيحة");

            setTimeout(() => {
                setError('');
            }, 3000)
        } else {

            // toast.success('Welcome back !', {
            //     theme: "colored",
            // })
            replace("/")

        }


    }

    return (
        <div className="bg-no-repeat bg-cover bg-center relative bg-red-300">
            <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
            <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                    <div className="self-start hidden lg:flex flex-col  text-white">
                        {/* <img src="" className="mb-3"> */}
                        <h1 className="mb-3 font-bold text-5xl">The chat platform </h1>
                        <p className="pr-3">Lorem ipsum is placeholder text commonly used in the graphic, print,
                            and publishing industries for previewing layouts and visual mockups</p>
                    </div>
                </div>
                <div className="flex justify-center self-center  z-10">
                    <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                        <div className="mb-4">
                            <h3 className="font-semibold text-2xl text-gray-800">Sign {isLogin ? ' In' : 'Up'} </h3>
                            <p className="text-gray-500">Please sign {isLogin ? ' In' : 'Up'}  to your account.</p>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={toFormikValidationSchema(Schema)}
                            onSubmit={isLogin ? handleSignIn : handleSignUp}


                        >
                            {({
                                values,
                                handleBlur,
                                handleChange,
                                errors,
                                touched,
                            }) => (

                                <Form>

                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <Label>Username </Label>
                                            <Input
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                touched={touched.username}
                                                error={errors.username}
                                                id='username'
                                                type="text"
                                                placeholder="example"
                                            />
                                        </div>
                                        {!isLogin && (
                                            <div className="space-y-2">
                                                <Label>Email </Label>
                                                <Input
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    touched={touched.email}
                                                    error={errors.email}
                                                    id='email'
                                                    type="text"
                                                    placeholder="example@gmail.com" />
                                            </div>
                                        )}


                                        <div className="space-y-2">
                                            <Label>Password </Label>
                                            <Input
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                touched={touched.password}
                                                error={errors.password}
                                                id='password'
                                                type="password"
                                                placeholder="********" />

                                        </div>

                                        <div>
                                            <Button type="submit">Submit </Button>
                                        </div>
                                    </div>
                                </Form>


                            )}

                        </Formik>

                        <div className="pt-5 text-center text-gray-500 text-m">
                            <Button onClick={() => setIsLogin(!isLogin)} className="btn-link text-gray-500">
                                or Sign {!isLogin ? ' In' : 'Up'}

                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Auth.getLayout = (page: any) => page

export default Auth