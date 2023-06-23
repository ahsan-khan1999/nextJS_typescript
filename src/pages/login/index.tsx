import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import { AddFunction } from "@/types";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import * as yup from "yup"
import { updateQuery } from "@/utils/update-query";

export default function Home() {
    const [error, setError] = useState("");
    const router = useRouter()

    const onSubmit = async (data: { email: string; password: string, description: string }) => {
        try {


            alert(JSON.stringify(data))
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <LoginForm onSubmit={onSubmit} />
            <div onClick={() => {
                // const updatedQuery = {
                //     ...router.query,
                // };

                // const routeWithQuery = {
                //     pathname: `${router.pathname}`,
                //     query: updatedQuery,
                // };

                // router.push(routeWithQuery, undefined, {
                //     locale: "en",
                // });
                updateQuery(router, "en")
            }} > EN</div>
            <div onClick={() => {
                // const updatedQuery = {
                //     ...router.query,
                // };

                // const routeWithQuery = {
                //     pathname: `${router.pathname}`,
                //     query: updatedQuery,
                // };

                // router.push(routeWithQuery, undefined, {
                //     locale: "de",
                // });
                updateQuery(router, "de")

            }}>DE</div>

        </div>
    );
}

export async function getServerSideProps({ locale }: string) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
