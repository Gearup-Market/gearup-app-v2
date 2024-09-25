import React, { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Nprogress = ({
  startPosition = 0.2,
  stopDelayMs = 200,
  options = {
    showSpinner: false,
  },
}: any) => {
  let timer: any = null;

  const routeChangeStart = () => {
    NProgress.set(startPosition);
    NProgress.start();
  };

  const routeChangeEnd = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      NProgress.done(true);
    }, stopDelayMs);
  };

  useEffect(() => {
    options && NProgress.configure(options);

    Router.events.on("routeChangeStart", routeChangeStart);
    Router.events.on("routeChangeComplete", routeChangeEnd);
    Router.events.on("routeChangeError", routeChangeEnd);
  }, []);

  return null;
};

export default Nprogress;
