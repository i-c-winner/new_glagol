var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, createRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Glagol from "../../App/Glagol";
import Screen from "../Screen/Screen";
if (!Glagol.xmpp.getInitialStatus()) {
    console.log();
    Glagol.xmpp.init();
    Glagol.xmpp.initialization();
}
function Room() {
    var _a = useState(''), roomName = _a[0], setRoomName = _a[1];
    useEffect(function () {
        setRoomName(window.location.pathname.split('/')[1]);
    }, []);
    var _b = useState(""), userName = _b[0], setUserName = _b[1];
    var inputRef = createRef();
    var _c = useState(true), isCreatingUserName = _c[0], setIsCreatingUserName = _c[1];
    function createUserName() {
        Glagol.xmpp.createRoom(roomName);
        Glagol.xmpp.peerInit();
        setIsCreatingUserName(false);
    }
    function changeUserName() {
        setUserName(inputRef.current.value);
    }
    return _jsxs("div", { children: [_jsxs("p", { children: ["RoomName: ", roomName] }), _jsx("hr", {}), _jsxs("p", { children: ["ScreenName: ", userName] }), _jsx("hr", {}), isCreatingUserName ? _jsxs("div", { children: [_jsx(Box, __assign({ component: "form", sx: {
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }, noValidate: true, autoComplete: "off" }, { children: _jsx(TextField, { id: "outlined-basic", onChange: changeUserName, label: "Outlined", inputRef: inputRef, variant: "outlined" }) })), _jsx(Stack, __assign({ spacing: 2, direction: "row" }, { children: _jsx(Button, __assign({ onClick: createUserName, variant: "outlined" }, { children: "Input Name" })) }))] }) : _jsx(Screen, {})] });
}
export default Room;
