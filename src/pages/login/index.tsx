import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { AddFunction } from "@/types";

export default function Home() {
    const [error, setError] = useState("");

    const onSubmit = async (data: { email: string; password: string }) => {
        try {

            const additionFunction: AddFunction = (x, y) => {
                return x + y
            }
            alert(JSON.stringify(data))
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <LoginForm onSubmit={onSubmit} />
        </div>
    );
}
