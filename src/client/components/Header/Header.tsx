import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

import { homeRoute, aboutRoute } from "client/constants/routes";

export const Header: FC = () => {
  return (
    <Box component="header" textAlign="center">
      <Container maxWidth={false}>
        <Stack direction="row" spacing={4} my={4} justifyContent="center">
          <Link to={homeRoute} component={RouterLink}>
            home
          </Link>
          <Link to={aboutRoute} component={RouterLink}>
            about
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
