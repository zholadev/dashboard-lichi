import React from 'react';
import {cn} from "@/lib/utils";
import {Input} from "@/components/shared/ui/input";
import {Button} from "@/components/shared/ui/button";
import {Heading} from "@/components/shared/uikit/heading";

/**
 * @author Zholaman Zhumanov
 * @created 24.01.2024
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function LoginPage(props) {
    return (
    <div className={cn("w-full flex flex-col justify-center content-center items-center mt-20")}>
            <form className={cn("px-10 py-20 w-[400px] flex border rounded flex-col justify-center items-center")}>
                <Heading type={"h1"} cls={cn("mb-10")}>Авторизуйтесь</Heading>
                <div className={cn("mb-5 w-full")}>
                    <Input
                        className={cn("mb-3 w-full")}
                        defaultValue={"email"}
                        type={"email"}
                        placeholder={"Введите логин"}/>
                    <Input
                        className={cn("mb-3 w-full")}
                        defaultValue={""}
                        type={"password"}
                        placeholder={"Введите пароль"}/>
                </div>

                <Button
                    type={"submit"}
                    className={cn("w-full")}
                >
                    Войти
                </Button>
                <Button
                    type={"submit"}
                    variant={"secondary"}
                    className={cn("w-full mt-3")}
                >
                    Войти через Passport
                </Button>
            </form>
        </div>
    );
}

export default LoginPage;
