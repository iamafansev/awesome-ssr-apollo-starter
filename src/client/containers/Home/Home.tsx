import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { MainLayout } from "client/components/MainLayout/MainLayout";

const RootCSS = css({
  paddingTop: 48,
  paddingBottom: 48,
  backgroundColor: "lightpink",
});

export const Home: FC = () => {
  const [t] = useTranslation("home");

  return (
    <MainLayout>
      <Helmet title={t("meta.title")} />
      <div css={RootCSS}>
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
