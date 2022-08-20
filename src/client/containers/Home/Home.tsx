import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { MainLayout } from "client/components/MainLayout/MainLayout";

import "./Home.css";

export const Home: FC = () => {
  const [t] = useTranslation("home");

  return (
    <MainLayout>
      <Helmet title={t("meta.title")} />
      <div className="Home-header">
        <Container maxWidth={false}>
          <Typography variant="h2" align="center" component="h1">
            {t("title")}
          </Typography>
          <Typography variant="body1" align="center">
            {t("description")}
          </Typography>
        </Container>
      </div>
    </MainLayout>
  );
};
