import {IconButton, InputAdornment, TextField, TextFieldProps} from "@mui/material";
import React, {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export function PasswordInput({InputProps, ...props}: TextFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const toggle = () => setShowPassword((v) => !v);
    return (
        <TextField
            {...props}
            type={showPassword ? props.type || 'text' : 'password'}
            InputProps={{
                ...(InputProps ?? {}),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={toggle} edge="end">
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );

}
