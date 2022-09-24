import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { GetLocationsDocument } from "./locationsQuery.graphql-generated";
import CrystalSvg from "./crystal.svg";

const RootCSS = css({
  paddingTop: 48,
  paddingBottom: 48,
  backgroundColor: "lightpink",
});

const CrystalCSS = css({
  paddingTop: 48,
  paddingBottom: 48,
  textAlign: "center",
  fontSize: 64,
  color: "lightpink",
});

export const Home: FC = () => {
  const [t] = useTranslation("home");
  const { data } = useQuery(GetLocationsDocument);

  console.log(data);

  return (
    <>
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
      <div css={CrystalCSS}>
        <CrystalSvg />
      </div>
    </>
  );
};
