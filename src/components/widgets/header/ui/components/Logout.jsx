import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/shared/shadcn/ui/dialog";
import {useLogout} from "@/components/shared/hooks";
import {Button} from "@/components/shared/shadcn/ui/button";
import {ExitIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";

/**
 * @author Zholaman Zhumanov
 * @created 04.02.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function Logout(props) {
    const {openDialog, onChangeToggleDialog} = props

    const logout = useLogout()

    return (
        <Dialog open={openDialog} onOpenChange={onChangeToggleDialog}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} type={"button"} className={cn("flex items-center flex-row gap-2")}>
                    Выйти <ExitIcon/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Вы действительно хотите выйти?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Отмена
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type={"button"} variant={"destructive"} onClick={logout}>Да</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default Logout;
