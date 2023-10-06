import { useState, useEffect } from "react";
import Service from "../Service/service";
import styled from "styled-components";
import "./app.css";

const Button = styled.button`
    margin: 0px 3px;
    outline: none;
    background: #ecf0f1;
    border: 1px solid #d0d3d4;
    color: black;
    font-size: 20px;
    border-radius: 5px;
    padding: 3px 7px;
    transition: all 0.3s ease;
    width: 67px;
    height: 53px;
`;

const App = () => {
    const [calcButtons] = useState([
        "CE",
        "C",
        "DEL",
        "%",
        "7",
        "8",
        "9",
        "*",
        "4",
        "5",
        "6",
        "-",
        "1",
        "2",
        "3",
        "+",
        "!",
        "0",
        "=",
    ]);

    const [express, setExpress] = useState("0");
    const [extraExpress, setExtraExpress] = useState("");
    const [operator, setOperator] = useState("");
    const [result, setResult] = useState("");

    const { postExpress, request } = Service();

    useEffect(() => {
        if (express === "") {
            setExpress("0");
        }
    }, [express]);

    useEffect(() => {
        if (operator === "!") {
            setExpress("");
        }
    }, [operator]);

    const onButtonClick = (e) => {
        if (result !== "") {
            onClearFullExpress();
            setExpress((express) => e.target.textContent);
            return;
        }
        if (express.length > 11) {
            return;
        }
        if (express === "0") {
            setExpress("");
        }
        setExpress((express) => express + e.target.textContent);
    };

    const onClearFullExpress = () => {
        setExpress("0");
        setExtraExpress("");
        setOperator("");
        setResult("");
    };

    const onClearOneExpress = () => {
        if (result !== "") {
            onClearFullExpress();
            return;
        }
        setExpress((express) => "0");
    };

    const onDelete = () => {
        if (result !== "") {
            onClearFullExpress();
            return;
        }
        setExpress((express) => express.substring(0, express.length - 1));
    };

    const onAction = (e) => {
        const localOperator = e.target.textContent;
        setOperator(localOperator);
        if (localOperator === "!") {
            console.log("lab");
            console.log(Number(express));
            if (Number(express) > 20) {
                console.log("ladno");
                onClearFullExpress();
                return;
            }
            setExtraExpress(express);
            setExpress("");
            //сразу надо запускать onResult
            onResult();
            return;
        }
        if (extraExpress === "") {
            setExtraExpress(express);
        }

        onClearOneExpress();
    };

    const onResult = async () => {
        if (extraExpress === "") {
            return;
        }

        const jrequest = {
            FirstNum: Number(extraExpress),
            SecondNum: Number(express),
            Symbol: operator,
        };
        const result = await request(JSON.stringify(jrequest));
        setResult(result.Result);
    };

    const buttons = calcButtons.map((buttonTag, i) => {
        switch (buttonTag) {
            case "CE":
                return (
                    <Button key={i} onClick={onClearFullExpress}>
                        {buttonTag}
                    </Button>
                );
            case "C":
                return (
                    <Button key={i} onClick={onClearOneExpress}>
                        {buttonTag}
                    </Button>
                );
            case "=":
                return (
                    <Button
                        className="equals-button"
                        key={i}
                        onClick={onResult}
                    >
                        {buttonTag}
                    </Button>
                );
            case "DEL":
                return (
                    <Button key={i} onClick={onDelete}>
                        {buttonTag}{" "}
                    </Button>
                );
            default:
                if (["!", "%", "*", "-", "+"].includes(buttonTag)) {
                    return (
                        <Button key={i} onClick={onAction}>
                            {buttonTag}
                        </Button>
                    );
                } else {
                    return (
                        <Button key={i} onClick={onButtonClick}>
                            {buttonTag}
                        </Button>
                    );
                }
        }
    });

    const printResult = result !== "" ? result : express;
    const printExpress =
        result !== ""
            ? `${extraExpress} ${operator} ${express} =`
            : `${extraExpress} ${operator} `;
    return (
        <div>
            <div className="container">
                <div className="view-panel">
                    <input
                        id="ladno"
                        className="view-panel-first"
                        type="text"
                        disabled
                        value={printExpress}
                    ></input>
                    <input
                        id="ladno2"
                        className="view-panel-second"
                        type="text"
                        disabled
                        value={printResult}
                    ></input>
                </div>
                <div className="button-panel">{buttons}</div>
            </div>
        </div>
    );
};

export default App;
