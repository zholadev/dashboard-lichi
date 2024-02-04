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
                <Button variant={"ghost"} type={"button"}>
                    Log out
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
