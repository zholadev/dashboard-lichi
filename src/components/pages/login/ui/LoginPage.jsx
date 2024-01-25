'use client'

import React from 'react';
import * as z from "zod"
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form"
import {ReloadIcon} from "@radix-ui/react-icons";
import {Input} from "@/components/shared/ui/input";
import {Button} from "@/components/shared/ui/button";
import {zodResolver} from "@hookform/resolvers/zod"
import {useApiRequest} from "@/components/shared/hooks";
import {Heading} from "@/components/shared/uikit/heading";
import {routerPagesList} from "@/components/entities/router";
import {apiLogin} from "@/components/shared/services/axios/clientRequests";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/shared/ui/form";
import Cookie from "js-cookie";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @todo refactoring
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function LoginPage(props) {
    const router = useRouter()

    const {apiFetchHandler, loading} = useApiRequest()

    const formSchema = z.object({
        login: z.string().min(2, {
            message: "Имя пользователя должно состоять минимум из 2 символов.",
        }),
        password: z.string().min(2, {
            message: "Пароль пользователя должно состоять минимум из 2 символов.",
        }),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    })

    const onSubmit = (values) => {
        const {login, password} = values
        fetchLogin(login, password)
    }

    const fetchLogin = async (login, password) => {
        await apiFetchHandler(
            apiLogin,
            [login, password],
            false,
            {
                onGetData: (params) => {
                    if (params.success) {
                        Cookie.set("dashboard-token", params.data?.["token"])
                        setTimeout(() => {
                            router.push(routerPagesList.main)
                        }, 800)
                    }
                }
            }
        )
    }

    return (
        <div className={cn("w-full flex flex-col justify-center content-center items-center mt-20")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className={cn("px-10 py-20 w-[400px] flex border rounded flex-col justify-center items-center")}>
                    <Heading type={"h1"} cls={cn("mb-10")}>Авторизуйтесь</Heading>
                    <div className={cn("mb-5 w-full")}>
                        <FormField
                            control={form.control}
                            name="login"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className={cn("mb-3 w-full")}
                                                type={"text"}
                                                {...field}
                                                placeholder={"Введите логин"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className={cn("mb-3 w-full")}
                                                type={"password"}
                                                {...field}
                                                placeholder={"Введите пароль"}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }}
                        />
                    </div>

                    <Button
                        type={"submit"}
                        className={cn("w-full")}
                        disabled={loading}
                    >
                        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                        Войти
                    </Button>
                    <Button
                        type={"button"}
                        variant={"secondary"}
                        className={cn("w-full mt-3")}
                        disabled={loading}
                    >
                        Войти через Passport
                    </Button>
                </form>
            </Form>

        </div>
    );
}

export default LoginPage;
