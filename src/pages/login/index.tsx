import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { updateQuery } from "@/utils/update-query";
import { Locale } from "@/types";

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
                updateQuery(router, "en")
            }} > EN</div>
            <div onClick={() => {
                updateQuery(router, "de")
            }}>DE</div>

        </div>
    );
}

export async function getServerSideProps({ locale }: Locale) {

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
