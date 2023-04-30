import { Form, Formik } from "formik"
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter"
import Button from "../buttons/Button";
import Label from "./Label";
import Input from "./Input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import FileInput from "./FileInput";

type FormProps = {
    isLogin: boolean
}

const SignInForm = ({ isLogin }: FormProps) => {

    const [error, setError] = useState<String>('')

    const [file, setFile] = useState<File | null>()
    const [stringFile, setStringFile] = useState<string>('')

    const { mutateAsync } = api.auth.signUp.useMutation()

    const { replace } = useRouter()


    const initialValues = {
        email: '',
        username: '',
        password: '',
    }


    const Schema = z.object({
        email: isLogin ? z.optional(z.string().email()) : z.string().email(),
        username: z.string().min(5),
        password: z.string().min(8),
    });


    async function handleSignIn(values: {
        email: String,
        password: String,
        username?: String
    }) {
        const result = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
        });

        if (!result?.ok) {
            setError("البريد الالكتروني او كلمة المرور غير صحيحة");

            setTimeout(() => {
                setError('');
            }, 3000)
        } else {

            // toast.success('Welcome back !', {
            //     theme: "colored",
            // })
            // replace("/")

        }


    }

    async function handleSignUp(values: any) {



        if (!file) {
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setStringFile(reader.result as string)
        }



        const user = await mutateAsync({
            email: values.email,
            username: values.username,
            password: values.password,
            avatar: stringFile
        })



        const result = await signIn("credentials", {
            redirect: false,
            username: values.username,
            password: values.password,
        });

        if (!result?.ok) {

            setError(result?.error ?? "البريد الالكتروني او كلمة المرور غير صحيحة");

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

                        <p className="text-red-500">{error}</p>
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
                            <>
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


                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Upload avatar</span>
                                    </label>
                                    <FileInput
                                        onChange={(e) => {
                                            console.log(e.currentTarget)
                                            console.log(e.currentTarget.files)
                                            if (e.currentTarget?.files && e.currentTarget?.files[0]) {
                                                setFile(e.currentTarget.files[0])
                                            }

                                        }}
                                        id='avatar'
                                        name="avatar"
                                    />

                                </div>

                            </>



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
    )
}
export default SignInForm