import React from 'react'

import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';

const Footer = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                PHP Satellite
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Footer
