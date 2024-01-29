'use client'

import React, {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {CalendarIcon} from '@radix-ui/react-icons'
import {Label} from "@/components/shared/shadcn/ui/label";
import {Input} from "@/components/shared/shadcn/ui/input";
import {Button} from "@/components/shared/shadcn/ui/button";
import {Switch} from "@/components/shared/shadcn/ui/switch";
import {Calendar} from "@/components/shared/shadcn/ui/calendar";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/shared/shadcn/ui/select";
import {LoaderButton} from "@/components/shared/uikit/loader";
import {useAppSelector} from "@/components/entities/store/hooks/hooks";
import {apiGetProductsListData} from "@/components/shared/services/axios/clientRequests";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/shared/shadcn/ui/popover";
import {useApiRequest, useDispatchActionHandle, usePreviousFriday} from "@/components/shared/hooks";

/**
 * @author Zholaman Zhumanov
 * @created 26.01.2024
 * @param props
 * @returns {Element}
 * @constructor
 */
function ProductsForm(props) {

    const events = useDispatchActionHandle()

    const {apiFetchHandler, loading} = useApiRequest()
    const lastFriday = usePreviousFriday();

    const {report, category, page, detail_by_store, limit, productsData} = useAppSelector(state => state.products)

    const [date, setDate] = useState({
        from: lastFriday,
        to: new Date(),
    })

    const fetchProductsData = async (e) => {
        if (e) e.preventDefault()

        let apiParams = {
            category: category,
            date: {
                start: format(date.from, "dd/MM/yyyy"), end: format(date.to, "dd/MM/yyyy")
            },
            download: 0,
            limit: limit,
            detail_by_store: detail_by_store ? "1" : "0",
            page: page,
            report: report,
            sort_direction: -1
        }

        await apiFetchHandler(
            apiGetProductsListData,
            [apiParams],
            events.productsApiLoader,
            {
                onGetData: (params) => {
                    if (params.success) {
                        events.productsGetProductsData(params.data)
                    }
                }
            }
        )
    }

    useEffect(() => {
        if (productsData.length === 0) return
        fetchProductsData()
    }, [limit, page]);

    useEffect(() => {
        return () => {
            events.productsResetData()
        }
    }, []);

    return (
        <div className={cn("w-100 border mb-20 p-4 rounded mt-3")}>
            <form onSubmit={fetchProductsData}
                  className={cn("grid gap-10 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-10 items-center")}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4"/>
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(date.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Выберите дату</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            locate={ru}
                        />
                    </PopoverContent>
                </Popover>

                <Select onValueChange={value => events.productsReportParams(value)}>
                    <SelectTrigger className="w-100">
                        <SelectValue placeholder="Отчет"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="by_articles">По артикулам</SelectItem>
                        <SelectItem value="by_colors">По цветам</SelectItem>
                        <SelectItem value="by_sizes">По размерам</SelectItem>
                        <SelectItem value="by_sizes2">По размерам [Test2]</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={value => events.productsCategoryParams(value)}>
                    <SelectTrigger className="w-100">
                        <SelectValue placeholder="Категория товара"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все...</SelectItem>
                        <SelectItem value="be12a3d0-c8f8-11eb-8258-fcde56ff0106">Дубликат для интернет
                            магазина</SelectItem>
                        <SelectItem value="be12a3d7-c8f8-11eb-8258-fcde56ff0106">Акционный товар</SelectItem>
                        <SelectItem value="be12a1ed-c8f8-11eb-8258-fcde56ff0106">Одежда</SelectItem>
                        <SelectItem value="be12a1f1-c8f8-11eb-8258-fcde56ff0106">» Шорты</SelectItem>

                        <SelectGroup className={cn("mb-3")}>
                            <SelectLabel className={cn("mb-2 text-lg")}>Верхняя одежда</SelectLabel>
                            <SelectItem value="be12a1f2-c8f8-11eb-8258-fcde56ff0106">Верхняя одежда</SelectItem>
                            <SelectItem value="be12a1f5-c8f8-11eb-8258-fcde56ff0106">Пальто</SelectItem>
                            <SelectItem value="be12a1f8-c8f8-11eb-8258-fcde56ff0106">Куртка</SelectItem>
                            <SelectItem value="be12a1fb-c8f8-11eb-8258-fcde56ff0106">Пуховик</SelectItem>
                            <SelectItem value="be12a1fe-c8f8-11eb-8258-fcde56ff0106">Плащ</SelectItem>
                            <SelectItem value="be12a201-c8f8-11eb-8258-fcde56ff0106">Дубленка</SelectItem>
                            <SelectItem value="be12a204-c8f8-11eb-8258-fcde56ff0106">Шуба</SelectItem>
                            <SelectItem value="be12a22e-c8f8-11eb-8258-fcde56ff0106">Бомбер</SelectItem>
                            <SelectItem value="a643bd01-0ffa-11ee-a9d4-001b2162ed50">Жилетка</SelectItem>
                        </SelectGroup>

                        <SelectGroup className={cn("mb-3")}>
                            <SelectLabel className={cn("mb-2 text-lg")}>Брюки</SelectLabel>
                            <SelectItem value="be12a208-c8f8-11eb-8258-fcde56ff0106">Брюки</SelectItem>
                            <SelectItem value="be12a20b-c8f8-11eb-8258-fcde56ff0106">Брюки</SelectItem>
                            <SelectItem value="be12a20e-c8f8-11eb-8258-fcde56ff0106">Джинсы</SelectItem>
                            <SelectItem value="be12a211-c8f8-11eb-8258-fcde56ff0106">Леггинсы</SelectItem>
                        </SelectGroup>

                        <SelectGroup className={cn("mb-3")}>
                            <SelectLabel className={cn("mb-2 text-lg")}>Блузы и Топы</SelectLabel>
                            <SelectItem value="be12a212-c8f8-11eb-8258-fcde56ff0106">Блузы и Топы</SelectItem>
                            <SelectItem value="be12a207-c8f8-11eb-8258-fcde56ff0106">Рубашка</SelectItem>
                            <SelectItem value="be12a215-c8f8-11eb-8258-fcde56ff0106">Майка</SelectItem>
                            <SelectItem value="be12a218-c8f8-11eb-8258-fcde56ff0106">Футболка</SelectItem>
                            <SelectItem value="be12a21b-c8f8-11eb-8258-fcde56ff0106">Бюстье</SelectItem>
                            <SelectItem value="be12a21e-c8f8-11eb-8258-fcde56ff0106">Рубашка</SelectItem>
                            <SelectItem value="be12a221-c8f8-11eb-8258-fcde56ff0106">Блуза</SelectItem>
                            <SelectItem value="be12a224-c8f8-11eb-8258-fcde56ff0106">Топ</SelectItem>
                            <SelectItem value="be12a227-c8f8-11eb-8258-fcde56ff0106">Боди</SelectItem>
                            <SelectItem value="be12a22a-c8f8-11eb-8258-fcde56ff0106">Корсет</SelectItem>
                            <SelectItem value="febd27ae-7a1c-11ee-a9d4-001b2162ed50">не трогатьЛонгслив</SelectItem>
                            <SelectItem value="23643ba8-7a1d-11ee-a9d4-001b2162ed50">Лонгслив</SelectItem>
                        </SelectGroup>

                        <SelectGroup className={cn("mb-3")}>
                            <SelectLabel className={cn("mb-2 text-lg")}>Свитеры и Толстовки</SelectLabel>
                            <SelectItem value="be12a22b-c8f8-11eb-8258-fcde56ff0106">Свитеры и Толстовки</SelectItem>
                            <SelectItem value="be12a231-c8f8-11eb-8258-fcde56ff0106">Кардиган</SelectItem>
                            <SelectItem value="be12a234-c8f8-11eb-8258-fcde56ff0106">Свитер</SelectItem>
                            <SelectItem value="be12a237-c8f8-11eb-8258-fcde56ff0106">Толстовка</SelectItem>
                            <SelectItem value="be12a23a-c8f8-11eb-8258-fcde56ff0106">Джемпер</SelectItem>
                            <SelectItem value="be12a23d-c8f8-11eb-8258-fcde56ff0106">Худи</SelectItem>
                            <SelectItem value="be12a240-c8f8-11eb-8258-fcde56ff0106">Водолазка</SelectItem>
                            <SelectItem value="be12a243-c8f8-11eb-8258-fcde56ff0106">Жилет</SelectItem>
                        </SelectGroup>

                        <SelectGroup className={cn("mb-3")}>
                            <SelectLabel className={cn("mb-2 text-lg")}>Комплекты</SelectLabel>
                            <SelectItem value="be12a244-c8f8-11eb-8258-fcde56ff0106">Комплекты</SelectItem>
                            <SelectItem value="be12a247-c8f8-11eb-8258-fcde56ff0106">Костюм</SelectItem>
                            <SelectItem value="be12a24a-c8f8-11eb-8258-fcde56ff0106">Форма</SelectItem>
                        </SelectGroup>

                        <SelectGroup className={cn("mb-3")}>
                            <SelectLabel className={cn("mb-2 text-lg")}>Платья</SelectLabel>
                            <SelectItem value="be12a24b-c8f8-11eb-8258-fcde56ff0106">Платья</SelectItem>
                            <SelectItem value="be12a24e-c8f8-11eb-8258-fcde56ff0106">Платье</SelectItem>
                            <SelectItem value="be12a251-c8f8-11eb-8258-fcde56ff0106">Сарафан</SelectItem>
                            <SelectItem value="be12a254-c8f8-11eb-8258-fcde56ff0106">Форма</SelectItem>
                        </SelectGroup>

                        <SelectGroup className={cn("mb-3")}>
                            <SelectLabel className={cn("mb-2 text-lg")}>Категории платьев</SelectLabel>
                            <SelectItem value="3ba13d17-d1e6-11ec-9568-ac1f6b9a46e5">Категории платьев</SelectItem>
                            <SelectItem value="432c50f7-d1e6-11ec-9568-ac1f6b9a46e5">Платье Миди</SelectItem>
                            <SelectItem value="7b3c1f5f-0134-11ed-9568-ac1f6b9a46e5">Платье Макси</SelectItem>
                            <SelectItem value="819b07da-0134-11ed-9568-ac1f6b9a46e5">Платье Мини</SelectItem>
                        </SelectGroup>

                        <SelectGroup className={cn("mb-3")}>
                            <SelectLabel className={cn("mb-2 text-lg")}>Жакеты</SelectLabel>
                            <SelectItem value="be12a255-c8f8-11eb-8258-fcde56ff0106">Жакеты</SelectItem>
                            <SelectItem value="be12a258-c8f8-11eb-8258-fcde56ff0106">Жакет</SelectItem>
                            <SelectItem value="be12a25b-c8f8-11eb-8258-fcde56ff0106">Жилет костюмный</SelectItem>
                            <SelectItem value="be12a25e-c8f8-11eb-8258-fcde56ff0106">Туника</SelectItem>
                        </SelectGroup>

                        <SelectItem value="be12a25f-c8f8-11eb-8258-fcde56ff0106">» Юбки</SelectItem>
                        <SelectItem value="be12a262-c8f8-11eb-8258-fcde56ff0106">» » Юбка</SelectItem>
                        <SelectItem value="7c806249-1634-11ee-a9d4-001b2162ed50">» » Категории юбок</SelectItem>
                        <SelectItem value="950f47c9-1634-11ee-a9d4-001b2162ed50">» » » Макси</SelectItem>
                        <SelectItem value="9b9d85d1-1634-11ee-a9d4-001b2162ed50">» » » Миди</SelectItem>
                        <SelectItem value="a24aea56-1634-11ee-a9d4-001b2162ed50">» » » Мини</SelectItem>
                        <SelectItem value="be12a263-c8f8-11eb-8258-fcde56ff0106">» Комбинезоны</SelectItem>
                        <SelectItem value="be12a266-c8f8-11eb-8258-fcde56ff0106">» » Комбинезон</SelectItem>
                        <SelectItem value="be12a267-c8f8-11eb-8258-fcde56ff0106">» Купальники</SelectItem>
                        <SelectItem value="be12a26a-c8f8-11eb-8258-fcde56ff0106">» » Купальник</SelectItem>
                        <SelectItem value="be12a26d-c8f8-11eb-8258-fcde56ff0106">» » Купальник верх</SelectItem>
                        <SelectItem value="be12a270-c8f8-11eb-8258-fcde56ff0106">» » Купальник низ</SelectItem>
                        <SelectItem value="4ce652c3-eb9a-11eb-b9e9-89fd3d52ea2e">» Деним</SelectItem>
                        <SelectItem value="0a6d67f1-eeb3-11eb-b9eb-d90cb2bf6156">» » Джинсы</SelectItem>
                        <SelectItem value="a9c12f7b-eebc-11eb-b9eb-d90cb2bf6156">» » Рубашка</SelectItem>
                        <SelectItem value="d6e844fb-eebc-11eb-b9eb-d90cb2bf6156">» » Комбинезон</SelectItem>
                        <SelectItem value="ed8c1773-eebc-11eb-b9eb-d90cb2bf6156">» » Платье</SelectItem>
                        <SelectItem value="02bdb22f-eebd-11eb-b9eb-d90cb2bf6156">» » Юбка</SelectItem>
                        <SelectItem value="1ae1d97f-eebd-11eb-b9eb-d90cb2bf6156">» » Шорты</SelectItem>
                        <SelectItem value="31bb9e98-eebd-11eb-b9eb-d90cb2bf6156">» » Жакет</SelectItem>
                        <SelectItem value="82fc329b-8e6e-11ee-a9d4-001b2162ed50">» Lichi x Safa</SelectItem>
                        <SelectItem value="91f9f75a-8e76-11ee-a9d4-001b2162ed50">» Lichi x Safa</SelectItem>
                        <SelectItem value="185b0787-931a-11ee-a9d4-001b2162ed50">» Modest</SelectItem>
                        <SelectItem value="be12a271-c8f8-11eb-8258-fcde56ff0106">Аксессуары</SelectItem>
                        <SelectItem value="be12a28a-c8f8-11eb-8258-fcde56ff0106">» Очки</SelectItem>
                        <SelectItem value="be12a2ec-c8f8-11eb-8258-fcde56ff0106">» Часы</SelectItem>
                        <SelectItem value="be12a2f9-c8f8-11eb-8258-fcde56ff0106">» Маска</SelectItem>
                        <SelectItem value="be12a2fc-c8f8-11eb-8258-fcde56ff0106">» Аксессуар для формы</SelectItem>
                        <SelectItem value="be12a272-c8f8-11eb-8258-fcde56ff0106">» Головные уборы</SelectItem>
                        <SelectItem value="be12a275-c8f8-11eb-8258-fcde56ff0106">» » Шапка</SelectItem>
                        <SelectItem value="be12a278-c8f8-11eb-8258-fcde56ff0106">» » Кепка</SelectItem>
                        <SelectItem value="be12a27b-c8f8-11eb-8258-fcde56ff0106">» » Берет</SelectItem>
                        <SelectItem value="be12a27e-c8f8-11eb-8258-fcde56ff0106">» » Шляпа</SelectItem>
                        <SelectItem value="be12a281-c8f8-11eb-8258-fcde56ff0106">» » Платок</SelectItem>
                        <SelectItem value="be12a287-c8f8-11eb-8258-fcde56ff0106">» » Набор</SelectItem>
                        <SelectItem value="be12a28b-c8f8-11eb-8258-fcde56ff0106">» Аксессуары для мобильных телефонов
                        </SelectItem>
                        <SelectItem value="be12a28e-c8f8-11eb-8258-fcde56ff0106">» » Чехол iphone 5</SelectItem>
                        <SelectItem value="be12a291-c8f8-11eb-8258-fcde56ff0106">» » Чехол iPhone 4</SelectItem>
                        <SelectItem value="be12a294-c8f8-11eb-8258-fcde56ff0106">» » Наушники</SelectItem>
                        <SelectItem value="be12a297-c8f8-11eb-8258-fcde56ff0106">» » POWER BANK</SelectItem>
                        <SelectItem value="be12a29a-c8f8-11eb-8258-fcde56ff0106">» » Чехол iPhone 7+</SelectItem>
                        <SelectItem value="be12a29d-c8f8-11eb-8258-fcde56ff0106">» » Чехол iPhone 7</SelectItem>
                        <SelectItem value="be12a2a0-c8f8-11eb-8258-fcde56ff0106">» » Чехол iPhone 6</SelectItem>
                        <SelectItem value="be12a2a3-c8f8-11eb-8258-fcde56ff0106">» » Чехол iPhone 6+</SelectItem>
                        <SelectItem value="be12a2a6-c8f8-11eb-8258-fcde56ff0106">» » Шнур для iphone</SelectItem>
                        <SelectItem value="be12a2a7-c8f8-11eb-8258-fcde56ff0106">» Другие аксессуары</SelectItem>
                        <SelectItem value="be12a2aa-c8f8-11eb-8258-fcde56ff0106">» » Брелок</SelectItem>
                        <SelectItem value="be12a2ad-c8f8-11eb-8258-fcde56ff0106">» » Зеркало</SelectItem>
                        <SelectItem value="be12a2b0-c8f8-11eb-8258-fcde56ff0106">» » Крем для рук</SelectItem>
                        <SelectItem value="be12a2b3-c8f8-11eb-8258-fcde56ff0106">» » Подушка</SelectItem>
                        <SelectItem value="be12a2b4-c8f8-11eb-8258-fcde56ff0106">» Сумки</SelectItem>
                        <SelectItem value="be12a2b7-c8f8-11eb-8258-fcde56ff0106">» » Кошелек</SelectItem>
                        <SelectItem value="be12a2ba-c8f8-11eb-8258-fcde56ff0106">» » Сумка</SelectItem>
                        <SelectItem value="be12a2bb-c8f8-11eb-8258-fcde56ff0106">» Украшения</SelectItem>
                        <SelectItem value="be12a2be-c8f8-11eb-8258-fcde56ff0106">» » Кольцо</SelectItem>
                        <SelectItem value="be12a2c1-c8f8-11eb-8258-fcde56ff0106">» » Колье</SelectItem>
                        <SelectItem value="be12a2c4-c8f8-11eb-8258-fcde56ff0106">» » Браслет</SelectItem>
                        <SelectItem value="be12a2c7-c8f8-11eb-8258-fcde56ff0106">» » Ободок</SelectItem>
                        <SelectItem value="be12a2ca-c8f8-11eb-8258-fcde56ff0106">» » Резинка для волос</SelectItem>
                        <SelectItem value="be12a2cd-c8f8-11eb-8258-fcde56ff0106">» » Серьги</SelectItem>
                        <SelectItem value="be12a2d0-c8f8-11eb-8258-fcde56ff0106">» » Бабочка</SelectItem>
                        <SelectItem value="be12a2d3-c8f8-11eb-8258-fcde56ff0106">» » Повязка</SelectItem>
                        <SelectItem value="be12a2d6-c8f8-11eb-8258-fcde56ff0106">» » Подвеска</SelectItem>
                        <SelectItem value="be12a2d9-c8f8-11eb-8258-fcde56ff0106">» » Венок</SelectItem>
                        <SelectItem value="be12a2dc-c8f8-11eb-8258-fcde56ff0106">» » Значки</SelectItem>
                        <SelectItem value="be12a2df-c8f8-11eb-8258-fcde56ff0106">» » Брошь</SelectItem>
                        <SelectItem value="be12a2e2-c8f8-11eb-8258-fcde56ff0106">» » Заколки</SelectItem>
                        <SelectItem value="be12a2e5-c8f8-11eb-8258-fcde56ff0106">» » Подвеска для очков</SelectItem>
                        <SelectItem value="888b97a7-e267-11ec-9568-ac1f6b9a46e5">» » Аксессуары для волос</SelectItem>
                        <SelectItem value="bc5bc98d-0a8b-11ee-a9d4-001b2162ed50">» » Категории украшений</SelectItem>
                        <SelectItem value="ced4b150-0a8b-11ee-a9d4-001b2162ed50">» » » Колье</SelectItem>
                        <SelectItem value="daec7f52-0a8b-11ee-a9d4-001b2162ed50">» » » Серьги</SelectItem>
                        <SelectItem value="e79bad8d-0a8b-11ee-a9d4-001b2162ed50">» » » Браслеты</SelectItem>
                        <SelectItem value="eda1b252-0a8b-11ee-a9d4-001b2162ed50">» » » Броши</SelectItem>
                        <SelectItem value="fa7debed-0a8b-11ee-a9d4-001b2162ed50">» » » Украшения для волос</SelectItem>
                        <SelectItem value="e9f2ba07-0e94-11ee-a9d4-001b2162ed50">» » » Кольца</SelectItem>
                        <SelectItem value="be12a2e6-c8f8-11eb-8258-fcde56ff0106">» Ремни</SelectItem>
                        <SelectItem value="be12a2e9-c8f8-11eb-8258-fcde56ff0106">» » Ремень</SelectItem>
                        <SelectItem value="be12a2ed-c8f8-11eb-8258-fcde56ff0106">» Перчатки и Шарфы</SelectItem>
                        <SelectItem value="be12a2f0-c8f8-11eb-8258-fcde56ff0106">» » Варежки</SelectItem>
                        <SelectItem value="be12a2f3-c8f8-11eb-8258-fcde56ff0106">» » Перчатки</SelectItem>
                        <SelectItem value="be12a2f6-c8f8-11eb-8258-fcde56ff0106">» » Шарф</SelectItem>
                        <SelectItem value="deaee80a-116d-11ed-9568-ac1f6b9a46e5">» » Галстук</SelectItem>
                        <SelectItem value="16a1bae7-7929-11ec-9568-ac1f6b9a46e5">» шарф</SelectItem>
                        <SelectItem value="95e9b020-e24c-11ec-9568-ac1f6b9a46e5">» Носки</SelectItem>
                        <SelectItem value="72b4ebec-e24c-11ec-9568-ac1f6b9a46e5">» Аксессуары для волос</SelectItem>
                        <SelectItem value="be12a2fd-c8f8-11eb-8258-fcde56ff0106">Обувь</SelectItem>
                        <SelectItem value="be12a300-c8f8-11eb-8258-fcde56ff0106">» Кеды</SelectItem>
                        <SelectItem value="be12a303-c8f8-11eb-8258-fcde56ff0106">» Кроссовки</SelectItem>
                        <SelectItem value="be12a306-c8f8-11eb-8258-fcde56ff0106">» Туфли</SelectItem>
                        <SelectItem value="be12a309-c8f8-11eb-8258-fcde56ff0106">» Босоножки</SelectItem>
                        <SelectItem value="be12a30c-c8f8-11eb-8258-fcde56ff0106">» Сандалии</SelectItem>
                        <SelectItem value="be12a30f-c8f8-11eb-8258-fcde56ff0106">» Мокасины</SelectItem>
                        <SelectItem value="be12a312-c8f8-11eb-8258-fcde56ff0106">» Балетки</SelectItem>
                        <SelectItem value="be12a315-c8f8-11eb-8258-fcde56ff0106">» Сланцы</SelectItem>
                        <SelectItem value="be12a318-c8f8-11eb-8258-fcde56ff0106">» Слиперы</SelectItem>
                        <SelectItem value="be12a31b-c8f8-11eb-8258-fcde56ff0106">» Криперсы</SelectItem>
                        <SelectItem value="be12a31e-c8f8-11eb-8258-fcde56ff0106">» Биркенштоки</SelectItem>
                        <SelectItem value="be12a321-c8f8-11eb-8258-fcde56ff0106">» Слайды</SelectItem>
                        <SelectItem value="be12a324-c8f8-11eb-8258-fcde56ff0106">» Ботильоны</SelectItem>
                        <SelectItem value="be12a327-c8f8-11eb-8258-fcde56ff0106">» Сапоги</SelectItem>
                        <SelectItem value="be12a32a-c8f8-11eb-8258-fcde56ff0106">» Ботинки</SelectItem>
                        <SelectItem value="be12a32d-c8f8-11eb-8258-fcde56ff0106">» Мюли</SelectItem>
                        <SelectItem value="be12a330-c8f8-11eb-8258-fcde56ff0106">» Шлёпанцы</SelectItem>
                        <SelectItem value="be12a333-c8f8-11eb-8258-fcde56ff0106">» Лоферы</SelectItem>
                        <SelectItem value="be12a334-c8f8-11eb-8258-fcde56ff0106">Hübsch</SelectItem>
                        <SelectItem value="be12a3b2-c8f8-11eb-8258-fcde56ff0106">» Подушка</SelectItem>
                        <SelectItem value="be12a3b5-c8f8-11eb-8258-fcde56ff0106">» НЕТ ИНФОРМАЦИИ</SelectItem>
                        <SelectItem value="be12a335-c8f8-11eb-8258-fcde56ff0106">» Гостиная</SelectItem>
                        <SelectItem value="be12a338-c8f8-11eb-8258-fcde56ff0106">» » Блокнот</SelectItem>
                        <SelectItem value="be12a33b-c8f8-11eb-8258-fcde56ff0106">» » Ежедневник</SelectItem>
                        <SelectItem value="be12a33e-c8f8-11eb-8258-fcde56ff0106">» » Пенал</SelectItem>
                        <SelectItem value="be12a341-c8f8-11eb-8258-fcde56ff0106">» » Ручка</SelectItem>
                        <SelectItem value="be12a344-c8f8-11eb-8258-fcde56ff0106">» » Тетрадь</SelectItem>
                        <SelectItem value="be12a347-c8f8-11eb-8258-fcde56ff0106">» » Открытка</SelectItem>
                        <SelectItem value="be12a34a-c8f8-11eb-8258-fcde56ff0106">» » Стикеры</SelectItem>
                        <SelectItem value="be12a34d-c8f8-11eb-8258-fcde56ff0106">» » Копилка</SelectItem>
                        <SelectItem value="be12a350-c8f8-11eb-8258-fcde56ff0106">» » Подушка</SelectItem>
                        <SelectItem value="be12a353-c8f8-11eb-8258-fcde56ff0106">» » Свеча</SelectItem>
                        <SelectItem value="be12a356-c8f8-11eb-8258-fcde56ff0106">» » Ваза</SelectItem>
                        <SelectItem value="be12a359-c8f8-11eb-8258-fcde56ff0106">» » Часы</SelectItem>
                        <SelectItem value="be12a35c-c8f8-11eb-8258-fcde56ff0106">» » Зеркало</SelectItem>
                        <SelectItem value="be12a35f-c8f8-11eb-8258-fcde56ff0106">» » Фотоколлаж</SelectItem>
                        <SelectItem value="be12a362-c8f8-11eb-8258-fcde56ff0106">» » Стул</SelectItem>
                        <SelectItem value="be12a365-c8f8-11eb-8258-fcde56ff0106">» » Плечики</SelectItem>
                        <SelectItem value="be12a368-c8f8-11eb-8258-fcde56ff0106">» » Настенная вешалка</SelectItem>
                        <SelectItem value="be12a36b-c8f8-11eb-8258-fcde56ff0106">» » Ключница</SelectItem>
                        <SelectItem value="be12a36e-c8f8-11eb-8258-fcde56ff0106">» » Декоративная табличка</SelectItem>
                        <SelectItem value="be12a371-c8f8-11eb-8258-fcde56ff0106">» » Статуэтка</SelectItem>
                        <SelectItem value="be12a372-c8f8-11eb-8258-fcde56ff0106">» Кухня</SelectItem>
                        <SelectItem value="be12a375-c8f8-11eb-8258-fcde56ff0106">» » Термос</SelectItem>
                        <SelectItem value="be12a378-c8f8-11eb-8258-fcde56ff0106">» » Бутылка</SelectItem>
                        <SelectItem value="be12a37b-c8f8-11eb-8258-fcde56ff0106">» » Тарелка</SelectItem>
                        <SelectItem value="be12a37e-c8f8-11eb-8258-fcde56ff0106">» » Кружка</SelectItem>
                        <SelectItem value="be12a381-c8f8-11eb-8258-fcde56ff0106">» » Контейнер</SelectItem>
                        <SelectItem value="be12a384-c8f8-11eb-8258-fcde56ff0106">» » Набор для сыпучих продуктов
                        </SelectItem>
                        <SelectItem value="be12a387-c8f8-11eb-8258-fcde56ff0106">» » Стакан</SelectItem>
                        <SelectItem value="be12a38a-c8f8-11eb-8258-fcde56ff0106">» » Детский набор</SelectItem>
                        <SelectItem value="be12a38d-c8f8-11eb-8258-fcde56ff0106">» » Поднос</SelectItem>
                        <SelectItem value="be12a390-c8f8-11eb-8258-fcde56ff0106">» » Тортница</SelectItem>
                        <SelectItem value="be12a393-c8f8-11eb-8258-fcde56ff0106">» » Разделочная доска</SelectItem>
                        <SelectItem value="be12a396-c8f8-11eb-8258-fcde56ff0106">» » Масленка</SelectItem>
                        <SelectItem value="be12a399-c8f8-11eb-8258-fcde56ff0106">» » Чашка и блюдце</SelectItem>
                        <SelectItem value="be12a39c-c8f8-11eb-8258-fcde56ff0106">» » Сахарница</SelectItem>
                        <SelectItem value="be12a39d-c8f8-11eb-8258-fcde56ff0106">» Ванная комната</SelectItem>
                        <SelectItem value="be12a3a0-c8f8-11eb-8258-fcde56ff0106">» » Занавеская для ванной</SelectItem>
                        <SelectItem value="be12a3a3-c8f8-11eb-8258-fcde56ff0106">» » Коврик</SelectItem>
                        <SelectItem value="be12a3a6-c8f8-11eb-8258-fcde56ff0106">» » Ершик</SelectItem>
                        <SelectItem value="be12a3a9-c8f8-11eb-8258-fcde56ff0106">» » Ведро</SelectItem>
                        <SelectItem value="be12a3ac-c8f8-11eb-8258-fcde56ff0106">» » Набор для ванной</SelectItem>
                        <SelectItem value="be12a3af-c8f8-11eb-8258-fcde56ff0106">» » Ароматизатор</SelectItem>
                        <SelectItem value="041e4bae-ad0b-11ed-a9d4-001b2162ed50">» Этикетки</SelectItem>
                        <SelectItem value="0a6626c7-ad0b-11ed-a9d4-001b2162ed50">» Этикетки</SelectItem>
                        <SelectItem value="be12a3b6-c8f8-11eb-8258-fcde56ff0106">Инвентарь</SelectItem>
                        <SelectItem value="be12a3bd-c8f8-11eb-8258-fcde56ff0106">» Пакеты</SelectItem>
                        <SelectItem value="be12a3c0-c8f8-11eb-8258-fcde56ff0106">» Обувь для примерочной</SelectItem>
                        <SelectItem value="be12a3c3-c8f8-11eb-8258-fcde56ff0106">» Коробки для заказов ИМ</SelectItem>
                        <SelectItem value="be12a3c6-c8f8-11eb-8258-fcde56ff0106">» Открытка для Интернет Магазина
                        </SelectItem>
                        <SelectItem value="be12a3c9-c8f8-11eb-8258-fcde56ff0106">» Коробки для ИМ Казахстан</SelectItem>
                        <SelectItem value="be12a3b7-c8f8-11eb-8258-fcde56ff0106">» Плечики</SelectItem>
                        <SelectItem value="be12a3ba-c8f8-11eb-8258-fcde56ff0106">» » Плечики</SelectItem>
                        <SelectItem value="db4d567f-f920-11eb-b9ee-8c4e23a1eb73">» Флексоформы (DEC-6,35)</SelectItem>
                        <SelectItem value="9609ad0d-ad0b-11ed-a9d4-001b2162ed50">» Этикетка</SelectItem>
                        <SelectItem value="97142fcd-73ba-11ee-a9d4-001b2162ed50">» Крючки-вешалки для
                            одежды</SelectItem>
                        <SelectItem value="be12a3ca-c8f8-11eb-8258-fcde56ff0106">Мои услуги</SelectItem>
                        <SelectItem value="be12a3cd-c8f8-11eb-8258-fcde56ff0106">» Доставка</SelectItem>
                        <SelectItem value="2cc23ce6-e0b9-11eb-b9e7-d447e3128769">» Ежемесячная абонентская плата
                            франшиза
                        </SelectItem>
                        <SelectItem value="a2197bbd-5e75-11ec-9568-ac1f6b9a46e5">» Маркетинг</SelectItem>
                        <SelectItem value="418c6f29-85bc-11ec-9568-ac1f6b9a46e5">» Статьи дополнительных расходов
                        </SelectItem>
                        <SelectItem value="0ad9b592-5045-11ed-956b-ac1f6b9a46e5">» Штрафы</SelectItem>
                        <SelectItem value="04607ea6-5c68-11ee-a9d4-001b2162ed50">» Услуга Комисии</SelectItem>
                        <SelectItem value="be12a3d1-c8f8-11eb-8258-fcde56ff0106">Подарочные сертификаты</SelectItem>
                        <SelectItem value="be12a3d4-c8f8-11eb-8258-fcde56ff0106">» Подарочный сертификат</SelectItem>
                        <SelectItem value="778963dd-4c39-11ec-9568-ac1f6b9a46e5">Акции</SelectItem>
                        <SelectItem value="dad71411-4c3a-11ec-9568-ac1f6b9a46e5">» BLACKFRIDAY</SelectItem>
                        <SelectItem value="263e228b-51c4-11ec-9568-ac1f6b9a46e5">» PARTY</SelectItem>
                        <SelectItem value="68c75186-88bc-11ec-9568-ac1f6b9a46e5">Материал</SelectItem>
                    </SelectContent>
                </Select>

                <Input defaultValue={'Артикул'}/>

                {
                    detail_by_store &&
                    <Select>
                        <SelectTrigger className="w-100">
                            <SelectValue placeholder="Выберите магазины"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ru">Астана</SelectItem>
                            <SelectItem value="kz">Павло</SelectItem>
                            <SelectItem value="uae">Алматы</SelectItem>
                        </SelectContent>
                    </Select>
                }

                <div className={cn("flex items-center flex-wrap gap-10 justify-between")}>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-mode"
                                onCheckedChange={(value) => events.productsDetailByStoreParams(value)}/>
                        <Label htmlFor="airplane-mode">Группировка по магазинам</Label>
                    </div>

                    <Button
                        type={"submit"}
                        className={cn("2xl:w-[230px] w-[100%]")}>
                        <LoaderButton loading={loading}/>
                        Сформировать
                    </Button>
                </div>
            </form>
        </div>

    );
}

export default ProductsForm;
