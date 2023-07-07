import {Paper, styled} from "@mui/material";

export const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 3
}));

export enum Status {
    OPEN,
    DOING,
    DONE
}

export type TodoType = {
    id: string,
    description: string,
    status: Status
}

