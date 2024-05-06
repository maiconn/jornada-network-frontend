import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export function Footer(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://jornadati.com.br/">
                Jornada
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}