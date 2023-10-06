import { useCallback, useState } from "react";
// import fetch from "node-fetch";

//сетевые компоненты
const Service = () => {
    const [serviceJson, setJson] = useState(null);

    const postExpress = (request) => {
        let personJson = JSON.stringify(request);
        setJson(personJson);
    };

    const request = useCallback(
        async (
            body,
            url = "http://localhost:8080/calc",
            method = "POST",
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        ) => {
            try {
                console.log(body);
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                });

                if (!response.ok) {
                    console.log(response.status);
                    throw new Error(
                        `Could not fetch ${url}, status ${response.status}`
                    );
                }

                const data = await response.json();
                return data;
            } catch (e) {
                console.log(e.message);
                throw e;
            }
        },
        []
    );

    return { postExpress, request };
};

export default Service;
