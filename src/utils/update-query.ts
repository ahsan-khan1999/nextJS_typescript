import { QueryUpdate } from "@/types";

export const updateQuery: QueryUpdate = (router, lang) => {
    const updatedQuery = {
        ...router.query,
    };

    const routeWithQuery = {
        pathname: `${router.pathname}`,
        query: updatedQuery,
    };

    router.push(routeWithQuery, undefined, {
        locale: lang,
    });
}