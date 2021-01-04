import React, {FC} from 'react';
import {connect} from "react-redux";
import {loginUser} from "../redux/auth/actions";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, TextField} from "@material-ui/core";
import {LoginEntity} from '../models/login'
import {useForm, Controller} from "react-hook-form";
import FormControl from '@material-ui/core/FormControl';


interface LoginProps {
    user: any;
    loginUser: (login: LoginEntity) => LoginEntity
    history: any;
}

const Login: FC<LoginProps> = ({user, loginUser, history}) => {

    const {handleSubmit, control, errors: fieldsErrors, reset} = useForm<LoginEntity>();

    const classes = useStyles();

    const onSubmit = async (data: LoginEntity) => {
        await loginUser(data);
        history.push('/about')
        console.log(data)
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
                <FormControl fullWidth variant="outlined">
                    <Controller
                        name="username"
                        as={
                            <TextField
                                id="username"
                                helperText={fieldsErrors.username ? fieldsErrors.username.message : null}
                                variant="outlined"
                                label="Username"
                                error={!!fieldsErrors.username}
                            />
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required',
                        }}
                    />
                </FormControl>
                <FormControl fullWidth variant="outlined">
                    <Controller
                        name="password"
                        as={
                            <TextField
                                id="password"
                                helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                                variant="outlined"
                                label="Password"
                                error={!!fieldsErrors.password}
                            />
                        }
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Required',
                        }}
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    );
};


const mapToStateProps = (state: any) => {
    return {
        user: state.auth.user
    }
}
const mapToDispatchProps = (dispatch: any) => {
    return {
        loginUser: (login: LoginEntity) => dispatch(loginUser(login)),
    }
}

export default connect(mapToStateProps, mapToDispatchProps)(Login)

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);
